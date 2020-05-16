import { Project, UpdateProjectRequest } from '../../src/types';

export type Methods = {
  get: {
    resBody: Project;
  };
  delete: {};
  patch: {
    reqBody: UpdateProjectRequest;
    resBody: Project;
  };
};
