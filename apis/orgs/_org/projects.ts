import { Project, CreateProjectRequest } from 'src/types';

export type Methods = {
  get: {
    resBody: Array<Project>;
  };
  post: {
    reqBody: CreateProjectRequest;
    resBody: Project;
  };
};
