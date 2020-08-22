<h1 align="center">ts-github-projects</h1>
<p align="center">
<a href="https://badge.fury.io/js/ts-github-projects"><img src="https://badge.fury.io/js/ts-github-projects.svg" alt="npm version" height="18"></a>
<a href="https://github.com/9sako6/ts-github-projects/actions?query=workflow%3ACI"><img src="https://github.com/9sako6/ts-github-projects/workflows/CI/badge.svg" alt="CI" height="18"></a>
</p>

This is a simple library to manage GitHub Projects easily.
This supports to create a project, column, card, update them, show them, delete them, etc...
The library is built with [GitHub Projects API](https://docs.github.com/en/rest/reference/projects).

# Install

```bash
# with npm
npm install ts-github-projects

# with yarn
yarn add ts-github-projects
```

# Features

## Utilities

- [x] rate limit

## Projects

- [x] create a repository project
- [x] create an organization project
- [x] create a user project
- [x] get a project
- [x] list repository's projects
- [x] list organization's projects
- [x] list user's projects
- [x] update a project
- [x] delete a project

## Columns

- [x] crate a column
- [x] get a column
- [x] list columns
- [x] update a column
- [x] delete a column
- [x] move a column

## Cards

- [x] crate a card
  - [ ] associate with issue
  - [ ] associate with pull request
- [x] get a card
- [x] list cards
- [x] update a card
- [x] delete a card
- [x] move a card

## Collaborators

- [ ] list collaborators
- [ ] review a user's permission level
- [ ] add user as a collaborator
- [ ] remove user as a collaborator

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
   import { TsGitHubProjects } from "ts-github-projects";
   require("dotenv").config(); // dotenv

   const gh = new TsGitHubProjects({
     token: process.env.PERSONAL_ACCESS_TOKEN!,
   });
   ```

1. Don't forget to add `.env` to your `.gitignore` file.

## Examples

```typescript
import { TsGitHubProjects } from "ts-github-projects";
require("dotenv").config(); // dotenv

const gh = new TsGitHubProjects({ token: process.env.PERSONAL_ACCESS_TOKEN! });

// list projects
const projectsList = await gh.listUserProjects("username");

// create a project
const project = await gh.createUserProject({
  name: "My ToDo List",
  body: "description of the project",
});

// create a column
const column = await gh.createColumn(project.id, {
  name: "To do",
});
```
