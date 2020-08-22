import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { QueryBuilder } from '../../src/queryBuilder';

const mock = new MockAdapter(axios);

mock.onGet('/orgs/sample-user/projects', { params: { page: 1, per_page: 100 } }).reply(200, Array(100).fill(1));
mock.onGet('/orgs/sample-user/projects', { params: { page: 2, per_page: 100 } }).reply(200, Array(10).fill(1));
mock.onGet('/orgs/sample-user/projects', { params: { page: 6, per_page: 100 } }).reply(200, []);

it('should fetch organization projects', async () => {
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
