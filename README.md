<h1 align="center">ghpj</h1>
<p align="center">
<a href="https://badge.fury.io/js/ghpj"><img src="https://badge.fury.io/js/ghpj.svg" alt="npm version" height="18"></a>
<a href="https://github.com/9sako6/ghpj/actions?query=workflow%3ACI"><img src="https://github.com/9sako6/ghpj/workflows/CI/badge.svg" alt="CI" height="18"></a>
</p>

This is a simple library to manage GitHub Projects easily.
This supports to create a project, column, card, update them, show them, delete them, etc...
The library is built with [GitHub Projects API](https://docs.github.com/en/rest/reference/projects).

# Install

```bash
# with npm
npm install ghpj

# with yarn
yarn add ghpj
```

# Usage

For GitHub API v3 requests using OAuth, you can make up to 5000 requests per hour. For unauthenticated requests, the rate limit allows for up to 60 requests per hour. ([Rate limiting - GitHub Developer](https://developer.github.com/v3/#rate-limiting))

I recommend you to use OAuth.

## How to authorize with GitHub Personal Access Token

1. Create a personal access token ([Creating a personal access token for the command line - GitHub Help](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)).

1. Use [motdotla/dotenv](https://github.com/motdotla/dotenv) to load your personal access token.

1. Make `.env` file in the root directory of your project and set the token. For example:

   ```
   PERSONAL_ACCESS_TOKEN=<personal_access_token>
   ```

1. You can access it with `process.env.PERSONAL_ACCESS_TOKEN`.

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
    .select({ owner: "9sako6-playground" })
    .skip(10)
    .limit(2)
    .eagerLoad("columns", "cards")
    .fetch();
}

demo();
```
