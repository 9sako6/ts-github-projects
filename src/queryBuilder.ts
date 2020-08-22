import { AxiosInstance } from 'axios';
import { Authz, SelectParams } from './types';
import { createClient } from './client2';

export class QueryBuilder {
  private params: {
    limit: number,
    select?: SelectParams,
    skip: number,
    where: any,
  };
  private path?: string;
  private client: AxiosInstance;

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

  async fetch() {
    this.path = this.buildPath();
    let data: Array<any> = [];

    for (; ;) {
      // NOTE: `offset` is used to omit `this.params.skip` number of data.
      const offset = Math.max(this.params.skip - (this.params.where.per_page * (this.params.where.page - 1)), 0);
      const responseData = await this.client
        .get(this.path, { params: this.params.where })
        .then(res => res.data)
        .catch(error => { throw error; });

      if (!responseData) break;

      this.params.where.page++;
      data = [...data, ...responseData.slice(offset)];

      if (data.length >= this.params.limit) {
        data = data.slice(0, this.params.limit);
        break;
      }
      if (responseData.length < this.params.where.per_page) break;
    }

    this.clearCache();
    return data;
  }

  async fetchRateLimit() {
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
  }

  private buildPath(): string {
    const columnId = this.params.select?.columnId;
    const projectId = this.params.select?.projectId;
    const owner = this.params.select?.owner;
    const repo = this.params.select?.repo;

    if (columnId) {
      return `/projects/columns/${columnId}/cards`;
    } else if (projectId) {
      return `/projects/${projectId}/columns`;
    } else if (owner && repo) {
      return `/repos/${owner}/${repo}/projects`;
    } else if (owner) {
      return `/orgs/${owner}/projects`;
    } else {
      throw new Error('The parameters for \'select\' method are invalid.');
    }
  }
}
