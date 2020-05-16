import { CreateCardRequest, Card } from 'src/types';

export type Methods = {
  get: {
    resBody: Array<Card>;
  }
  post: {
    reqBody: CreateCardRequest;
    resBody: Card;
  }
}
