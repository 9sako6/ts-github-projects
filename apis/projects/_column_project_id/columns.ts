import { Column, CreateColumnRequest } from 'src/types';

export type Methods = {
  get: {
    resBody: Array<Column>;
  };
  post: {
    reqBody: CreateColumnRequest;
    resBody: Column;
  };
};
