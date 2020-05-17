import { Project, ListProjectsRequest } from '../../../src/types';

export type Methods = {
  get: {
    reqBody: ListProjectsRequest;
    resBody: Array<Project>;
  };
};
