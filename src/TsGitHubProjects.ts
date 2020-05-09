import client from './client'
import { Auth, Project } from './types'
// import { AxiosRequestConfig } from 'axios';
// import { AspidaClient } from 'aspida';

export default class TsGitHubProjects {
  private client: any;
  constructor(
    private auth?: Auth
  ) {
    this.client = client;
  }

  public async listRepositoryProjects(
    owner: string,
    repository: string
  ) {
    // 401 Unauthorized
    try {
      const data = await this.client
        .repos
        ._owner(owner)
        ._repo(repository)
        .projects
        .$get();
      return data;

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
}
