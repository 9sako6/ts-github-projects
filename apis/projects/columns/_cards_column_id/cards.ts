import { CreateCardRequest, Card } from 'src/types';

export type Methods = {
  post: {
    reqBody: CreateCardRequest;
    resBody: Card;
  }
}
