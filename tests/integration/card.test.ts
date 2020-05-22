import { TsGitHubProjects } from '../../src/';
import { setupAndCreateOrgProject } from '../../src/testHelper';

describe('testing column', () => {
  it('create project, operate column', async () => {
    // authorization
    const gh = new TsGitHubProjects({ token: process.env.PERSONAL_ACCESS_TOKEN! });
    // create a project
    const createdProject = await gh.createOrganizationProject(
      '9sako6-playground',
      {
        name: `create_organization_project_integration_test_at_${Date.now()}`,
        body: `test projcet ${Date.now()}`
      }
    );
    expect(createdProject).toBeDefined();
    const projectId = createdProject!.id!;
    // create a column
    const createColumnData = { name: `new_column_for_test_at_${Date.now()}` };
    let column = await gh.createColumn(projectId, createColumnData);
    expect(column).toBeDefined();
    const columnId = column!.id!;
    // create a card
    const createCardData1 = { note: `card_at_${Date.now()}` };
    let card = await gh.createCard(columnId, createCardData1);
    expect(card).toBeDefined();
    expect(card?.note).toEqual(createCardData1.note);
    // list cards
    const cards = await gh.listCards(columnId);
    expect(cards).toBeDefined();
    expect(cards![0]).toEqual(card);
    // get a card
    const cardId = card!.id;
    card = await gh.getCard(cardId);
    expect(card).toBeDefined();
    expect(card?.note).toEqual(createCardData1.note);
    // update a card
    const updateCardData = { note: `updated_at_${Date.now()}`, archived: true };
    const updatedCard = await gh.updateCard(cardId, updateCardData);
    expect(updatedCard).toBeDefined();
    expect(updatedCard?.note).toEqual(updateCardData.note);
    expect(updatedCard?.archived).toEqual(updateCardData.archived);
    // move a card
    const newCard1 = await gh.createCard(columnId, { note: 'card1' });
    const newCard2 = await gh.createCard(columnId, { note: 'card2' });
    let res = await gh.moveCard(columnId, newCard1!.id, newCard2!.id);
    expect(res.status).toEqual(201);
    // delete a card
    res = await gh.deleteCard(cardId);
    expect(res.status).toEqual(204);
    // delete a project
    res = await gh.deleteProject(projectId);
    expect(res.status).toEqual(204);
  });

  it('archived card', async () => {
    const [gh, project] = await setupAndCreateOrgProject();
    expect(project).toBeDefined();
    const column = await gh.createColumn(project.id, { name: 'has archived cards' });
    const card = await gh.createCard(column.id, { note: 'archived card' })
    const beforeNum = (await gh.listCards(column.id, 'archived')).length;
    await gh.updateCard(card.id, { archived: true });
    const afterNum = (await gh.listCards(column.id, 'archived')).length;
    expect(afterNum - beforeNum).toEqual(1);
    // delete a project
    const res = await gh.deleteProject(project.id);
    expect(res.status).toEqual(204);
  })

  it('list 102 cards', async () => {
    const [gh, project] = await setupAndCreateOrgProject();
    const column = await gh.createColumn(project.id, { name: 'has 102 cards' });
    const cardIds = [];
    for (let i = 1; i <= 102; ++i) {
      const card = await gh.createCard(column.id, { note: `card ${i}` });
      cardIds.push(card.id);
    }
    const cards = await gh.listCards(column.id);
    expect(cards.length).toEqual(102);
    const res = await gh.deleteProject(project.id);
    expect(res.status).toEqual(204);
  });
});
