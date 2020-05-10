import { Project, CreateProjectRequest } from 'src/types';

export type Methods = {
  get: {
    resBody: Project[];
  }

  post: {
    reqBody: CreateProjectRequest;
    resBody: Project;
  }
}
