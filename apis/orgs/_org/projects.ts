import { Project, CreateProjectRequest, ListProjectsRequest } from '../../../src/types';

export type Methods = {
  get: {
    query?: ListProjectsRequest;
    resBody: Array<Project>;
  };
  post: {
    reqBody: CreateProjectRequest;
    resBody: Project;
  };
};
