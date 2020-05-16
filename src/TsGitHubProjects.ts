import { Auth } from './types';
import { AspidaResponse } from 'aspida';
import GitHubProjects from './GitHubProjects';

export default class TsGitHubProjects extends GitHubProjects {
  constructor(auth?: Auth) {
    super(auth);
  }
  async moveColumn(columnId: number, afterColumnId: number): Promise<AspidaResponse<null, Record<string, string>>> {
    return await this._moveColumn(columnId, { position: `after:${afterColumnId}` });
  }
  async moveCard(columnId: number, cardId: number, afterCardId: number): Promise<AspidaResponse<null, Record<string, string>>> {
    return await this._moveCard(cardId, { position: `after:${afterCardId}`, column_id: columnId });
  }
}
