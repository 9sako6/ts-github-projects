import { Column, CreateColumnRequest } from 'src/types';

export type Methods = {
  get: {
    resBody: Array<Column>;
  }
  // delete: {}
  // patch: {
  //   reqBody: UpdateProjectRequest;
  //   resBody: Project;
  // }
  post: {
    reqBody: CreateColumnRequest;
    resBody: Column;
  }
}
