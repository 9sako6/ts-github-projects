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
  Card,
  CreateCardRequest,
  UpdateCardRequest,
  MoveCardRequest,
} from './types';
import { AspidaResponse } from 'aspida';
import { ApiInstance } from '../apis/$api';

export default abstract class GitHubProjects {
  protected client: ApiInstance;
  constructor(protected auth?: Auth) {
    let headers = undefined;
    if (this.auth && this.auth.token) {
      headers = { Authorization: `token ${this.auth.token}` };
    }
    this.client = makeClient(headers);
  }

  async listRepositoryProjects(owner: string, repository: string, state: 'open' | 'closed' | 'all' = 'open'): Promise<Array<Project>> {
    return await this.client
      .repos
      ._owner(owner)
      ._repo(repository)
      .projects
      .$get({ query: { state } })
      .catch(err => { throw err; });
  }

  async listOrganizationProjects(organization: string, state: 'open' | 'closed' | 'all' = 'open'): Promise<Array<Project>> {
    return await this.client
      .orgs
      ._org(organization)
      .projects
      .$get({ query: { state } })
      .catch(err => { throw err; });
  }

  async listUserProjects(username: string, state: 'open' | 'closed' | 'all' = 'open'): Promise<Array<Project>> {
    return await this.client
      .users
      ._username(username)
      .projects
      .$get({ query: { state } })
      .catch(err => { throw err; });
  }

  async getProject(projectId: number): Promise<Project> {
    return await this.client
      .projects
      ._project_id(projectId)
      .$get()
      .catch(err => { throw err; });
  }

  async deleteProject(projectId: number): Promise<AspidaResponse<null, Record<string, string>>> {
    return await this.client
      .projects
      ._project_id(projectId)
      .delete()
      .catch(err => { throw err; });
  }

  async createRepositoryProject(owner: string, repository: string, data: CreateProjectRequest): Promise<Project> {
    return await this.client
      .repos
      ._owner(owner)
      ._repo(repository)
      .projects
      .$post({ data })
      .catch(err => { throw err; });
  }

  async createOrganizationProject(organization: string, data: CreateProjectRequest): Promise<Project> {
    return await this.client
      .orgs
      ._org(organization)
      .projects
      .$post({ data })
      .catch(err => { throw err; });
  }

  async createUserProject(data: CreateProjectRequest): Promise<Project> {
    return await this.client
      .user
      .projects
      .$post({ data })
      .catch(err => { throw err; });
  }

  /**
   * Note: Updating a project's organization_permission requires admin access to the project.
   * @param data 
   */
  async updateProject(projectId: number, data: UpdateProjectRequest): Promise<Project> {
    return await this.client
      .projects
      ._project_id(projectId)
      .$patch({ data })
      .catch(err => { throw err; });
  }


  async createColumn(projectId: number, data: CreateColumnRequest): Promise<Column> {
    return await this.client
      .projects
      ._column_project_id(projectId)
      .columns
      .$post({ data })
      .catch(err => { throw err; });
  }

  async getColumn(columnId: number): Promise<Column> {
    return await this.client
      .projects
      .columns
      ._column_id(columnId)
      .$get()
      .catch(err => { throw err; });
  }

  async listColumns(projectId: number): Promise<Array<Column>> {
    return await this.client
      .projects
      ._column_project_id(projectId)
      .columns
      .$get()
      .catch(err => { throw err; });
  }

  async updateColumn(columnId: number, data: UpdateColumnRequest): Promise<Column> {
    return await this.client
      .projects
      .columns
      ._column_id(columnId)
      .$patch({ data })
      .catch(err => { throw err; });
  }

  async deleteColumn(columnId: number): Promise<AspidaResponse<null, Record<string, string>>> {
    return await this.client
      .projects
      .columns
      ._column_id(columnId)
      .delete()
      .catch(err => { throw err; });
  }

  protected async _moveColumn(columnId: number, data: MoveColumnRequest): Promise<AspidaResponse<null, Record<string, string>>> {
    return await this.client
      .projects
      .columns
      ._move_column_id(columnId)
      .moves
      .post({ data })
      .catch(err => { throw err; });
  }

  async createCard(columnId: number, data: CreateCardRequest): Promise<Card> {
    return await this.client
      .projects
      .columns
      ._cards_column_id(columnId)
      .cards
      .$post({ data })
      .catch(err => { throw err; });
  }


  async getCard(cardId: number): Promise<Card> {
    return await this.client
      .projects
      .columns
      .cards
      ._card_id(cardId)
      .$get()
      .catch(err => { throw err; });
  }

  async listCards(columnId: number): Promise<Array<Card>> {
    return await this.client
      .projects
      .columns
      ._cards_column_id(columnId)
      .cards
      .$get()
      .catch(err => { throw err; });
  }

  async updateCard(cardId: number, data: UpdateCardRequest): Promise<Card> {
    return await this.client
      .projects
      .columns
      .cards
      ._card_id(cardId)
      .$patch({ data })
      .catch(err => { throw err; });
  }

  protected async _moveCard(cardId: number, data: MoveCardRequest): Promise<AspidaResponse<null, Record<string, string>>> {
    return await this.client
      .projects
      .columns
      .cards
      ._move_card_id(cardId)
      .moves
      .post({ data })
      .catch(err => { throw err; });
  }

  async deleteCard(cardId: number): Promise<AspidaResponse<null, Record<string, string>>> {
    return await this.client
      .projects
      .columns
      .cards
      ._card_id(cardId)
      .delete()
      .catch(err => { throw err; });
  }

  async rateLimit(): Promise<RateLimit> {
    return await this.client
      .rate_limit
      .$get()
      .catch(err => { throw err; });
  }
}
