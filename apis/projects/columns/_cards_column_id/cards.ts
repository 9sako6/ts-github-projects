import { CreateCardRequest, Card, ListCardsRequest } from '../../../../src/types';

export type Methods = {
  get: {
    query?: ListCardsRequest;
    resBody: Array<Card>;
  };
  post: {
    reqBody: CreateCardRequest;
    resBody: Card;
  };
};
