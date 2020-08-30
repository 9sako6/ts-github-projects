interface Timestamp {
  created_at: string;
  updated_at: string;
}

type Creator = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
};

export interface Project extends Timestamp {
  owner_url: string;
  url: string;
  html_url: string;
  columns_url: string;
  id: number;
  node_id: string;
  name: string;
  body: string;
  number: number;
  state: 'open' | 'close';
  creator: Creator;
  columns?: Array<Column>;
  organization_permission: string;
  private: boolean;
}

export interface Column extends Timestamp {
  url: string;
  project_url: string;
  cards_url: string;
  id: number;
  node_id: string;
  name: string;
  cards?: Array<Card>;
}

export interface Card extends Timestamp {
  url: string;
  id: number;
  node_id: string;
  note: string;
  creator: Creator;
  archived: boolean;
  column_url: string;
  content_url?: string;
  project_url: string;
}

export type Authz = { token: string; };

type RateLimitAttributes = {
  limit: number;
  ramaining: number;
  reset: number;
};

export type RateLimitResponse = {
  resources: {
    core: RateLimitAttributes;
    graphql: RateLimitAttributes;
    integration_manifest: RateLimitAttributes;
    search: RateLimitAttributes;
  }
  rate: RateLimitAttributes;
};

export type TargetParam = 'projects' | 'columns' | 'cards';

export type EagerLoadParam = 'columns' | 'cards';

export type SelectParams = |
{ owner: string, repo?: string, projectId?: never, columnId?: never } | // it will fetch projects
{ owner?: never, repo?: never, projectId: number | string, columnId?: never } | // it will fetch columns
{ owner?: never, repo?: never, projectId?: never, columnId: number | string }; // it will fetch cards
