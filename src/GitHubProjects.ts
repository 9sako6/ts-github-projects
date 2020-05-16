import makeClient from './client';
import {
  Auth,
  RateLimit,
  Project,
  Column,
  CreateProjectRequest,
  UpdateProjectRequest,
  CreateColumnRequest,
  UpdateColumnRequest,
  MoveColumnRequest,
} from './types';
import { config } from 'dotenv';
import { AspidaResponse } from 'aspida';
import { ApiInstance } from 'apis/$api';
config();

export default abstract class GitHubProjects {
  protected client: ApiInstance;
  constructor(
    protected auth?: Auth
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
  ): Promise<Array<Project> | undefined> {
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
  ): Promise<Array<Project> | undefined> {
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
  ): Promise<Array<Project> | undefined> {
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

  public async deleteProject(
    projectId: number,
  ): Promise<AspidaResponse<null, Record<string, string>>> {
    return await this.client
      .projects
      ._project_id(projectId)
      .delete();
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

  public async createOrganizationProject(
    organization: string,
    data: CreateProjectRequest
  ): Promise<Project | undefined> {
    try {
      return await this.client
        .orgs
        ._org(organization)
        .projects
        .$post({ data });
    } catch (err) {
      if (err.code === 404) {
        return undefined;
      }
      throw err;
    }
  }

  public async createUserProject(
    data: CreateProjectRequest
  ): Promise<Project | undefined> {
    try {
      return await this.client
        .user
        .projects
        .$post({ data });
    } catch (err) {
      if (err.code === 404) {
        return undefined;
      }
      throw err;
    }
  }

  /**
   * Note: Updating a project's organization_permission requires admin access to the project.
   * @param data 
   */
  public async updateProject(
    projectId: number,
    data: UpdateProjectRequest
  ): Promise<Project | undefined> {
    try {
      return await this.client
        .projects
        ._project_id(projectId)
        .$patch({ data });
    } catch (err) {
      if (err.code === 404) {
        return undefined;
      }
      throw err;
    }
  }


  async createColumn(
    projectId: number,
    data: CreateColumnRequest
  ): Promise<Column | undefined> {
    try {
      return await this.client
        .projects
        ._column_project_id(projectId)
        .columns
        .$post({ data });
    } catch (err) {
      if (err.code === 404) {
        return undefined;
      }
      throw err;
    }
  }

  public async getColumn(
    columnId: number,
  ): Promise<Column | undefined> {
    try {
      return await this.client
        .projects
        .columns
        ._column_id(columnId)
        .$get();
    } catch (err) {
      if (err.code === 404) {
        return undefined;
      }
      throw err;
    }
  }

  public async listColumns(
    projectId: number
  ): Promise<Array<Column> | undefined> {
    try {
      return await this.client
        .projects
        ._column_project_id(projectId)
        .columns
        .$get();
    } catch (err) {
      if (err.code === 404) {
        return undefined;
      }
      throw err;
    }
  }

  public async updateColumn(
    columnId: number,
    data: UpdateColumnRequest
  ): Promise<Column | undefined> {
    try {
      return await this.client
        .projects
        .columns
        ._column_id(columnId)
        .$patch({ data });
    } catch (err) {
      if (err.code === 404) {
        return undefined;
      }
      throw err;
    }
  }

  public async deleteColumn(
    columnId: number,
  ): Promise<AspidaResponse<null, Record<string, string>>> {
    return await this.client
      .projects
      .columns
      ._column_id(columnId)
      .delete();
  }
  public async moveColumn(
    columnId: number,
    data: MoveColumnRequest
  ): Promise<AspidaResponse<null, Record<string, string>>> {
    return await this.client
      .projects
      .columns
      ._move_column_id(columnId)
      .moves
      .post({ data });
  }

  public async rateLimit(): Promise<RateLimit> {
    return await this.client
      .rate_limit
      .$get();
  }
}
