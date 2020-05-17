import { Project, ListProjectsRequest } from '../../../src/types';

export type Methods = {
  get: {
    query?: ListProjectsRequest;
    resBody: Array<Project>;
  };
};
