import { QueryBuilder } from '../../src';
import * as dotenv from "dotenv";
dotenv.config();

const gh = new QueryBuilder({ token: process.env.PERSONAL_ACCESS_TOKEN! });

it('should create, get, update, delete a repository project', async () => {
  const requestData = { name: `a repository project created at ${Date.now()}` };
  const project = await gh.create({ owner: '9sako6', repo: 'ghpj' }, requestData);
  const gotProject = await gh.get({ projectId: project.id });
  expect(gotProject.name).toEqual(requestData.name);

  const updateRequestData = { name: `a repository project updated at ${Date.now()}` };
  const updatedProject = await gh.update({ projectId: gotProject.id }, updateRequestData);
  expect(updatedProject.name).toEqual(updateRequestData.name);

  const res = await gh.delete({ projectId: updatedProject.id });
  expect(res.status).toBe(204);
});

it('should create, get, update, delete a user project', async () => {
  const requestData = { name: `a repository project ${Date.now()}` };
  const project = await gh.create(requestData);
  const gotProject = await gh.get({ projectId: project.id });
  expect(gotProject.name).toEqual(requestData.name);

  const updateRequestData = { name: `a repository project updated at ${Date.now()}` };
  const updatedProject = await gh.update({ projectId: gotProject.id }, updateRequestData);
  expect(updatedProject.name).toEqual(updateRequestData.name);

  const res = await gh.delete({ projectId: updatedProject.id });
  expect(res.status).toBe(204);
});

it('should create, get, update, delete a project column and card', async () => {
  // Create a project
  const projectRequestData = { name: `a repository project created at ${Date.now()}` };
  const project = await gh.create({ owner: '9sako6', repo: 'ghpj' }, projectRequestData);

  // The beggining of CRUD a column.
  const columnRequestData = { name: `a column created at ${Date.now}` };
  const column = await gh.create({ projectId: project.id }, columnRequestData);

  const gotColumn = await gh.get({ columnId: column.id });
  expect(gotColumn.name).toEqual(columnRequestData.name);

  const columnUpdateRequestData = { name: `a column updated at ${Date.now()}` };
  const updatedColumn = await gh.update({ columnId: gotColumn.id }, columnUpdateRequestData);
  expect(updatedColumn.name).toEqual(columnUpdateRequestData.name);

  // The beggining of CRUD a card.
  const cardRequestData = { note: `a card created at ${Date.now}` };
  const card = await gh.create({ columnId: column.id }, cardRequestData);

  const gotCard = await gh.get({ cardId: card.id });
  expect(gotCard.note).toEqual(cardRequestData.note);

  const cardUpdateRequestData = { note: `a card updated at ${Date.now()}` };
  const updatedCard = await gh.update({ cardId: gotCard.id }, cardUpdateRequestData);
  expect(updatedCard.note).toEqual(cardUpdateRequestData.note);

  expect((await gh.delete({ cardId: updatedCard.id })).status).toBe(204);
  // The end of CRUD a card.

  expect((await gh.delete({ columnId: updatedColumn.id })).status).toBe(204);
  // The end of CRUD a column.

  // Delete a project
  expect((await gh.delete({ projectId: project.id })).status).toBe(204);
});
