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
}

export interface Column extends Timestamp {
  url: string;
  project_url: string;
  cards_url: string;
  id: number;
  node_id: string;
  name: string;
}

// export type Auth = {
//   username: string;
//   password: string;
// } | { token: string; }
export type Auth = { token: string; }

type RateLimitAttributes = {
  limit: number;
  ramaining: number;
  reset: number;
};

export type RateLimit = {
  resources: {
    core: RateLimitAttributes;
    graphql: RateLimitAttributes;
    integration_manifest: RateLimitAttributes;
    search: RateLimitAttributes;
  }
  rate: RateLimitAttributes;
};

export type CreateProjectRequest = {
  name: string;
  body?: string;
};

export type UpdateProjectRequest = Partial<{
  name: string;
  body: string;
  state: 'open' | 'closed';
  organization_permission: 'read' | 'write' | 'admin' | 'none';
  private: boolean;
}>;

export type CreateColumnRequest = { name: string; };
export type UpdateColumnRequest = { name: string; };
