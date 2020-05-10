import makeClient from './client';
import { Auth, Project, RateLimit, CreateProjectRequest } from './types';
import { config } from 'dotenv';
config();

export default class TsGitHubProjects {
  private client: any; // TODO:FIX
  constructor(
    private auth?: Auth
  ) {
    let headers = undefined;
    if (this.auth && this.auth.token) {
      headers = { Authorization: `token ${this.auth.token}` };
    }
    this.client = makeClient(headers);
  }

  public async listRepositoryProjects(
    owner: string,
    repository: string
  ): Promise<Project[] | undefined> {
    try {
      return await this.client
        .repos
        ._owner(owner)
        ._repo(repository)
        .projects
        .$get();
    } catch (err) {
      if (err.code === 404) {
        return undefined;
      }
      throw err;
    }
  }

  public async listOrganizationProjects(
    organization: string,
  ): Promise<Project[] | undefined> {
    try {
      return await this.client
        .orgs
        ._org(organization)
        .projects
        .$get();
    } catch (err) {
      if (err.code === 404) {
        return undefined;
      }
      throw err;
    }
  }

  public async listUserProjects(
    username: string,
  ): Promise<Project[] | undefined> {
    try {
      return await this.client
        .users
        ._username(username)
        .projects
        .$get();
    } catch (err) {
      if (err.code === 404) {
        return undefined;
      }
      throw err;
    }
  }

  public async getProject(
    projectId: number,
  ): Promise<Project | undefined> {
    try {
      return await this.client
        .projects
        ._project_id(projectId)
        .$get();
    } catch (err) {
      if (err.code === 404) {
        return undefined;
      }
      throw err;
    }
  }

  public async createRepositoryProject(
    owner: string,
    repository: string,
    data: CreateProjectRequest
  ): Promise<Project | undefined> {
    try {
      return await this.client
        .repos
        ._owner(owner)
        ._repo(repository)
        .projects
        .$post({ data });
    } catch (err) {
      if (err.code === 404) {
        return undefined;
      }
      throw err;
    }
  }

  public async rateLimit(): Promise<RateLimit> {
    try {
      return await this.client
        .rate_limit
        .$get();
    } catch (err) {
      throw err;
    }
  }
}
