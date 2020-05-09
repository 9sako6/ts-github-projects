import client from './client'
import { Auth, Project } from './types'
import { AxiosInstance } from 'axios';

export default class TsGitHubProjects {
  private client: AxiosInstance;
  constructor(
    private auth?: Auth
  ) {
    this.client = client;
  }

  public async listRepositoryProjects(
    owner: string,
    repository: string
  ) {
    const url = `/repos/${owner}/${repository}/projects`;
    try {
      const { data } = await this.client.get(url);
      return data;

    } catch (err) {
      if (err.code === 404) {
        return undefined;
      }
      throw err;
    }
  }
  public async listUserProjects(
    user: string,
  ): Promise<Project[] | undefined> {
    const url = `/users/${user}/projects`;
    try {
      const { data } = await this.client.get(url);
      return data;

    } catch (err) {
      if (err.code === 404) {
        return undefined;
      }
      throw err;
    }
  }
}
