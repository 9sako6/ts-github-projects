/* eslint-disable */
import { AspidaClient } from 'aspida'
import { Methods as Methods0 } from './orgs/_org/projects'
import { Methods as Methods1 } from './projects/_project_id'
import { Methods as Methods2 } from './rate_limit'
import { Methods as Methods3 } from './repos/_owner/_repo/projects'
import { Methods as Methods4 } from './users/_username/projects'

const api = <T>(client: AspidaClient<T>) => {
  const prefix = (client.baseURL === undefined ? '' : client.baseURL).replace(/\/$/, '')

  return {
    orgs: {
      _org: (val0: number | string) => ({
        projects: {
          get: (option?: { config?: T }) =>
            client.fetch<Methods0['get']['resBody']>(prefix, `/orgs/${val0}/projects`, 'GET', option).json(),
          $get: async (option?: { config?: T }) =>
            (await client.fetch<Methods0['get']['resBody']>(prefix, `/orgs/${val0}/projects`, 'GET', option).json()).data
        }
      })
    },
    projects: {
      _project_id: (val1: number | string) => ({
        get: (option?: { config?: T }) =>
          client.fetch<Methods1['get']['resBody']>(prefix, `/projects/${val1}`, 'GET', option).json(),
        $get: async (option?: { config?: T }) =>
          (await client.fetch<Methods1['get']['resBody']>(prefix, `/projects/${val1}`, 'GET', option).json()).data
      })
    },
    rate_limit: {
      get: (option?: { config?: T }) =>
        client.fetch<Methods2['get']['resBody']>(prefix, '/rate_limit', 'GET', option).json(),
      $get: async (option?: { config?: T }) =>
        (await client.fetch<Methods2['get']['resBody']>(prefix, '/rate_limit', 'GET', option).json()).data
    },
    repos: {
      _owner: (val2: number | string) => ({
        _repo: (val3: number | string) => ({
          projects: {
            get: (option?: { config?: T }) =>
              client.fetch<Methods3['get']['resBody']>(prefix, `/repos/${val2}/${val3}/projects`, 'GET', option).json(),
            $get: async (option?: { config?: T }) =>
              (await client.fetch<Methods3['get']['resBody']>(prefix, `/repos/${val2}/${val3}/projects`, 'GET', option).json()).data,
            post: (option: { data: Methods3['post']['reqBody'], config?: T }) =>
              client.fetch<Methods3['post']['resBody']>(prefix, `/repos/${val2}/${val3}/projects`, 'POST', option).json(),
            $post: async (option: { data: Methods3['post']['reqBody'], config?: T }) =>
              (await client.fetch<Methods3['post']['resBody']>(prefix, `/repos/${val2}/${val3}/projects`, 'POST', option).json()).data
          }
        })
      })
    },
    users: {
      _username: (val4: number | string) => ({
        projects: {
          get: (option?: { config?: T }) =>
            client.fetch<Methods4['get']['resBody']>(prefix, `/users/${val4}/projects`, 'GET', option).json(),
          $get: async (option?: { config?: T }) =>
            (await client.fetch<Methods4['get']['resBody']>(prefix, `/users/${val4}/projects`, 'GET', option).json()).data
        }
      })
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
