import { AxiosInstance } from 'axios';
import { Authz, Card, Column, EagerLoadParam, RateLimitResponse, SelectParams, TargetParam } from './types';
import { createClient } from './client';

export class QueryBuilder {
  private params: {
    eagerLoad?: { [P in EagerLoadParam]: boolean },
    limit: number,
    select?: SelectParams,
    skip: number,
    target?: TargetParam,
    where: any,
  };
  private path?: string;
  private client: AxiosInstance;
  private fetchedData: Array<any> = [];

  constructor(private authz?: Authz) {
    const headers = this.authz?.token ? { Authorization: `token ${this.authz.token}` } : undefined;

    this.client = createClient(headers);
    this.params = this.initialParams();
  }

  select(params: SelectParams) {
    this.params.select = params;
    return this;
  }

  where(params: { state?: 'open' | 'closed' | 'all' }) {
    this.params.where = { ...this.params.where, ...params };
    return this;
  }

  skip(n: number) {
    this.params.skip = n;
    this.params.where.page = Math.floor(this.params.skip / this.params.where.per_page) + 1;
    return this;
  }

  limit(n: number) {
    this.params.limit = n;
    return this;
  }

  /**
   * Specify relationships to be eager loaded in the result set.
   * 
   * Projects has many columns.
   * Columns has many cards.
   * Therefore, columns are projects' children and cards are projects' grandchildren.
   * As well, cards are columns' children.
   * 
   * For example:
   * 
   * ```
   * const result = await instance.select({ owner: 'JaneDoe' })
   *  .eagerLoad('columns', 'cards')
   *  .fetch()
   * ```
   * 
   * `result` is array of projects which include columns and cards.
   */
  eagerLoad(children: EagerLoadParam, grandchildren?: EagerLoadParam) {
    this.params.eagerLoad = { columns: false, cards: false };
    this.params.eagerLoad[children] = true;
    if (grandchildren) this.params.eagerLoad[grandchildren] = true;

    return this;
  }

  async fetch() {
    for (; ;) {
      // NOTE: `offset` is used to omit `this.params.skip` number of data.
      const offset = Math.max(this.params.skip - (this.params.where.per_page * (this.params.where.page - 1)), 0);
      const responseData = await this.load();

      if (!responseData) break;

      this.params.where.page++;
      this.fetchedData = [...this.fetchedData, ...responseData.slice(offset)];

      if (this.fetchedData.length >= this.params.limit) {
        this.fetchedData = this.fetchedData.slice(0, this.params.limit);
        break;
      }
      if (responseData.length < this.params.where.per_page) break;
    }

    if (this.params.eagerLoad) await this.loadDescendants();

    const response = this.fetchedData;
    this.clearCache();
    return response;
  }

  async fetchRateLimit(): Promise<RateLimitResponse> {
    return await this.client
      .get('/rate_limit')
      .then(res => res.data)
      .catch(error => { throw error; });
  }

  private initialParams() {
    return { limit: Infinity, skip: 0, where: { page: 1, per_page: 100 } };
  }

  private clearCache() {
    this.params = this.initialParams();
    delete this.path;
    this.fetchedData = [];
  }

  private buildPath(): string {
    const columnId = this.params.select?.columnId;
    const projectId = this.params.select?.projectId;
    const owner = this.params.select?.owner;
    const repo = this.params.select?.repo;

    if (columnId) {
      this.params.target = 'cards';
      return `/projects/columns/${columnId}/cards`;
    } else if (projectId) {
      this.params.target = 'columns';
      return `/projects/${projectId}/columns`;
    } else if (owner && repo) {
      this.params.target = 'projects';
      return `/repos/${owner}/${repo}/projects`;
    } else if (owner) {
      this.params.target = 'projects';
      return `/orgs/${owner}/projects`;
    } else {
      throw new Error('The parameters of \'select\' query are invalid.');
    }
  }

  private async load() {
    if (!this.path) this.path = this.buildPath();

    const data = await this.client
      .get(this.path, { params: this.params.where })
      .then(res => res.data)
      .catch(error => { throw error; });

    return data;
  }

  private async loadDescendants() {
    switch (this.params.target) {
      case 'projects':
        if (this.params.eagerLoad!['columns']) {
          await this.loadChildren();
          if (this.params.eagerLoad!['cards']) await this.loadGrandchildren();
        }
        break;
      case 'columns':
        if (this.params.eagerLoad!['cards']) await this.loadChildren();
        break;
      default:
        throw new Error('The parameters of \'eagerLoad\' query are invalid.');
    }
  }

  private async loadChildren() {
    if (this.params.target === 'projects' || this.params.target === 'columns') {
      const children = this.params.target === 'projects' ? 'columns' : 'cards';
      const target = this.params.target;
      const token = this.authz?.token;

      const fetchedChildrenData = await Promise.all(this.fetchedData.map(function (item) {
        return new QueryBuilder(token ? { token } : undefined)
          .select(target === 'projects' ? { projectId: item.id } : { columnId: item.id })
          .fetch();
      })).catch(error => { throw new Error(error); });

      this.fetchedData.forEach((item, index) => item[children] = fetchedChildrenData[index]);
    } else {
      throw new Error('The parameters of \'eagerLoad\' query are invalid.');
    }
  }

  private async loadGrandchildren() {
    if (this.params.target === 'projects') {
      const token = this.authz?.token;
      const fetchedGrandchildrenData = await Promise.all(this.fetchedData.map(function (item) {
        return Promise.all(item.columns.map(function (column: Column) {
          return new QueryBuilder(token ? { token } : undefined)
            .select({ columnId: column.id })
            .fetch();
        })).catch(error => { throw new Error(error); });
      })).catch(error => { throw new Error(error); });

      this.fetchedData.forEach((item, projectIndex) => {
        item.columns.forEach((column: Column, columnIndex: number) => {
          column.cards = fetchedGrandchildrenData[projectIndex][columnIndex] as Array<Card>;
        });
      });
    } else {
      throw new Error('The parameters of \'eagerLoad\' query are invalid.');
    }
  }
}
