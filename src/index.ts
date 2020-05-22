import { Auth, ArchivedStatus, Card } from './types';
import { AspidaResponse } from 'aspida';
import GitHubProjects from './GitHubProjects';

export class TsGitHubProjects extends GitHubProjects {
  constructor(auth?: Auth) {
    super(auth);
  }

  async moveColumn(columnId: number, afterColumnId: number): Promise<AspidaResponse<null, Record<string, string>>> {
    return await this._moveColumn(columnId, { position: `after:${afterColumnId}` });
  }

  async moveCard(columnId: number, cardId: number, afterCardId: number): Promise<AspidaResponse<null, Record<string, string>>> {
    return await this._moveCard(cardId, { position: `after:${afterCardId}`, column_id: columnId });
  }

  private async *_listCardsGenerator(columnId: number, archived_state: ArchivedStatus = 'not_archived', page = 1, per_page = 100): AsyncGenerator<Card[], undefined, unknown> {
    let startIndex = page;
    while (true) {
      const res = await this._listCards(columnId, archived_state, startIndex, per_page);
      yield res;
      ++startIndex;
      if (res.length < per_page) {
        return;
      }
    }
  }

  async listCards(columnId: number, archived_state: ArchivedStatus = 'not_archived', page = 1, per_page = 100): Promise<Array<Card>> {
    const fetchListCards = this._listCardsGenerator(columnId, archived_state, page, per_page);
    let res: Array<Card> = [];
    for (; ;) {
      const resSub = await fetchListCards.next();
      if (!resSub.value) {
        break;
      } else {
        res = [...res, ...resSub.value];
      }
    }
    return res;
  }
}
