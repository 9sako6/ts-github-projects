import { Project, CreateProjectRequest } from 'src/types';

export type Methods = {
  post: {
    reqBody: CreateProjectRequest;
    resBody: Project;
  }
}
