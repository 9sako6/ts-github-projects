import { Card, UpdateCardRequest } from '../../../../src/types';

export type Methods = {
  get: {
    resBody: Card;
  };
  patch: {
    reqBody: UpdateCardRequest;
    resBody: Card;
  };
  delete: {};
};
