<h1 align="center">ghpj</h1>
<p align="center">
<a href="https://badge.fury.io/js/ghpj"><img src="https://badge.fury.io/js/ghpj.svg" alt="npm version" height="18"></a>
<a href="https://github.com/9sako6/ghpj/actions?query=workflow%3ACI"><img src="https://github.com/9sako6/ghpj/workflows/CI/badge.svg" alt="CI" height="18"></a>
</p>

This is a simple API client for GitHub Projects.
The library is built with [GitHub Projects API](https://docs.github.com/en/rest/reference/projects).

# Install

```bash
# with npm
npm install --save-dev ghpj

# with yarn
yarn add -D ghpj
```

# Usage

You can make up to 5,000 requests per hour when these requests are authorized with GitHub's personal access token. For unauthorized requests, the rate limit allows for up to 60 requests per hour. ([Rate limiting - GitHub Developer](https://docs.github.com/en/developers/apps/rate-limits-for-github-apps))

## How to authorize with GitHub Personal Access Token

1. Create a personal access token ([Creating a personal access token for the command line - GitHub Help](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)).

1. Use [motdotla/dotenv](https://github.com/motdotla/dotenv) to load your personal access token.

1. Make `.env` file in the root directory of your project and set the token. For example:

   ```
   PERSONAL_ACCESS_TOKEN=<personal_access_token>
   ```

1. You can access the environment variable with `process.env.PERSONAL_ACCESS_TOKEN`.

   ```typescript
   import { QueryBuilder } from "ghpj";
   import * as dotenv from "dotenv";
   dotenv.config();

   const gh = new QueryBuilder({ token: process.env.PERSONAL_ACCESS_TOKEN! });
   ```

1. Don't forget to add `.env` to your `.gitignore` file.

## Examples

```typescript
import { QueryBuilder } from "ghpj";
import * as dotenv from "dotenv";
dotenv.config();

async function demo() {
  // skip 10 projects and fetch up to 2 projects with columns and cards.
  const gh = new QueryBuilder({ token: process.env.PERSONAL_ACCESS_TOKEN! });
  const data = await gh
    .select({ owner: "jane-doe" })
    .skip(10)
    .limit(2)
    .eagerLoad("columns", "cards")
    .fetch();
}

demo();
```

# Methods

```typescript
import { QueryBuilder } from "ghpj";
import * as dotenv from "dotenv";
dotenv.config();

// initialize
const gh = new QueryBuilder({ token: process.env.PERSONAL_ACCESS_TOKEN! });
```

## `select`

- `select({ owner: string }): this`
- `select({ owner: string, repo: string }): this`
- `select({ projectId: string | number }): this`
- `select({ columnId: string | number }): this`

Specity results.

```typescript
// fetch user projects
const userProjects = await gh.select({ owner: "jane-doe" }).fetch();

// fetch repository projects
const repoProjects = await gh
  .select({ owner: "jane-doe", repo: "hello-world" })
  .fetch();

// fetch columns.
const columns = await gh.select({ projectId: repoProjects[0].id }).fetch();

// fetch cards.
const cards = await gh.select({ columnId: columns[0].id }).fetch();
```

## `limit`

- `limit(n: number): this`

Limit number of results.

```typescript
// fetch only 7 projects
const projects = await gh.select({ owner: "jane-done" }).limit(7).fetch();
```

## `skip`

- `skip(n: number): this`

Skip results.

```typescript
// fetch the next 7 projects
const projects = await gh.select({ owner: "jane-done" }).skip(7).fetch();
```

## `eagerLoad`

- `eagerLoad(arg: 'columns'): this`
- `eagerLoad(arg: 'cards'): this`
- `eagerLoad(arg1: 'columns', arg2: 'cards'): this`

Specify relationships to be eager loaded in the result set.

Projects have many columns. Columns have many cards. Therefore, columns are projects' children and cards are projects' grandchildren. As well, cards are columns' children.

```typescript
const projects = await gh
  .select({ owner: "jane-doe" })
  .eagerLoad("columns", "cards")
  .fetch();
```

`projects` is array of projects which include columns and cards.

## `fetch`

- `fetch(): Promise<Project[] | Column[] | Card[]>`

Ends the chain sequence and collects data.

## `fetchRateLimit`

- `fetchRateLimit(): Promise<RateLimitResponse>`

Get rate limit status.

```typescript
const rateLimitStatus = await gh.fetchRateLimit();
```

A response example:

```
{
  resources: {
    core: { limit: 5000, used: 111, remaining: 4889, reset: 1599749076 },
    search: { limit: 30, used: 0, remaining: 30, reset: 1599746130 },
    graphql: { limit: 5000, used: 17, remaining: 4983, reset: 1599749604 },
    integration_manifest: { limit: 5000, used: 0, remaining: 5000, reset: 1599749670 },
    source_import: { limit: 100, used: 0, remaining: 100, reset: 1599746130 },
    code_scanning_upload: { limit: 500, used: 0, remaining: 500, reset: 1599749670 }
  },
  rate: { limit: 5000, used: 111, remaining: 4889, reset: 1599749076 }
}
```

## `create`

- `create(requestData: { name: string, body?: string }): Promise<Project>`
- `create(param: { owner: string, repo: string }, requestData: { name: string, body?: string }): Promise<Project>`
- `create(param: { projectId: string | number }, requestData: { name: string }): Promise<Column>`
- `create(param: { columnId: string | number }, requestData: { note: string }): Promise<Card>`
- `create(param: { columnId: string | number }, requestData: { content_id: string | number, content_type: 'Issue' | 'PullRequest' }): Promise<Card>`

Create a project, column or card.

## `get`

- `get(param: { projectId: string | number }): Promise<Project>`
- `get(param: { columnId: string | number }): Promise<Column>`
- `get(param: { cardId: string | number }): Promise<Card>`

Get a project, column or card.

## `update`

- `update(param: { projectId: string | number }, requestData: { name?: string, body?: string, state?: 'open' | 'closed', organization_permission?: 'read' | 'write' | 'admin' | 'none', private?: boolean }): Promise<Project>`
- `update(param: { columnId: string | number }, requestData: { name?: string }): Promise<Column>`
- `update(param: { cardId: string | number }, requestData: { note?: string, archived?: boolean }): Promise<Card>`

Update a project, column or card.

## `delete`

- `delete(param: { projectId: string | number }): Promise<any>`
- `delete(param: { columnId: string | number }): Promise<any>`
- `delete(param: { cardId: string | number }): Promise<any>`

Delete a project, column or card.
