import { Column, UpdateColumnRequest } from 'src/types';

export type Methods = {
  get: {
    resBody: Column;
  }
  patch: {
    reqBody: UpdateColumnRequest;
    resBody: Column;
  }
  delete: {}
}
