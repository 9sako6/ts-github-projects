import { sampleUser as creator } from './users';
import { Project } from '../../src/types';

// NOTE: /orgs/sample-user/projects
export const sampleUserProject: Project = {
  owner_url: 'https://api.github.com/orgs/sample-user',
  url: 'https://api.github.com/projects/1',
  html_url: 'https://github.com/orgs/sample-user/projects/1',
  columns_url: 'https://api.github.com/projects/1/columns',
  id: 1,
  node_id: '',
  name: '',
  body: '',
  number: 1,
  state: 'open',
  creator,
  created_at: '2020-08-23T13:27:05Z',
  updated_at: '2020-08-23T13:27:06Z',
  organization_permission: 'write',
  private: true
};
