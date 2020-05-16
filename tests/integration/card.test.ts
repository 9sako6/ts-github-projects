import TsGitHubProjects from 'src/TsGitHubProjects';

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
    // delete a project
    const res = await gh.deleteProject(projectId);
    expect(res.status).toEqual(204);
  });
});
