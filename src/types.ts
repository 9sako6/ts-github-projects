type Creator = {
  login: string,
  id: number,
  node_id: string,
  avatar_url: string,
  gravatar_id: string,
  url: string,
  html_url: string,
  followers_url: string,
  following_url: string,
  gists_url: string,
  starred_url: string,
  subscriptions_url: string,
  organizations_url: string,
  repos_url: string,
  events_url: string,
  received_events_url: string,
  type: string,
  site_admin: boolean
}

export type Project = {
  owner_url: string,
  url: string,
  html_url: string,
  columns_url: string,
  id: number,
  node_id: string,
  name: string,
  body: string,
  number: number,
  state: string,
  creator: Creator,
  created_at: string,
  updated_at: string
}

// export type Auth = {
//   username: string;
//   password: string;
// } | { token: string; }
export type Auth = { token: string; }
