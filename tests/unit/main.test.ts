import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { QueryBuilder } from '../../src';
import { sampleUserProject } from '../fixtures/projects';
import { sampleColumn } from '../fixtures/columns';
import { sampleCard } from '../fixtures/cards';

const mock = new MockAdapter(axios);

it('should fetch organization projects', async () => {
  mock.onGet('/users/sample-user/projects', { params: { page: 1, per_page: 100 } }).reply(200, Array(100).fill(1));
  mock.onGet('/users/sample-user/projects', { params: { page: 2, per_page: 100 } }).reply(200, Array(10).fill(1));
  mock.onGet('/users/sample-user/projects', { params: { page: 6, per_page: 100 } }).reply(200, []);

  const gh = new QueryBuilder();
  let res = null;

  res = await gh.select({ owner: 'sample-user' })
    .skip(50)
    .fetch();
  expect(res.length).toBe(60);

  res = await gh.select({ owner: 'sample-user' })
    .skip(500)
    .fetch();
  expect(res.length).toBe(0);

  res = await gh.select({ owner: 'sample-user' })
    .limit(105)
    .fetch();
  expect(res.length).toBe(105);

  res = await gh.select({ owner: 'sample-user' })
    .skip(20)
    .limit(100)
    .fetch();
  expect(res.length).toBe(90);
});

it('#eagerLoad', async () => {
  mock.onGet('/users/sample-user/projects', { params: { page: 1, per_page: 100 } }).reply(200, [sampleUserProject]);
  mock.onGet(`/projects/${sampleUserProject.id}/columns`, { params: { page: 1, per_page: 100 } }).reply(200, [sampleColumn]);
  mock.onGet(`/projects/columns/${sampleColumn.id}/cards`, { params: { page: 1, per_page: 100 } }).reply(200, [sampleCard]);

  const project = sampleUserProject;
  const column = sampleColumn;
  column.cards = [sampleCard];
  project.columns = [column];

  const gh = new QueryBuilder();
  let res = null;

  res = await gh.select({ owner: 'sample-user' })
    .eagerLoad('columns', 'cards')
    .fetch();
  expect(res).toEqual([project]);
});
