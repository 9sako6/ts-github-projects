/* eslint-disable */
import { AspidaClient } from 'aspida'
import { Methods as Methods0 } from './orgs/_org/projects'
import { Methods as Methods1 } from './rate_limit'
import { Methods as Methods2 } from './repos/_owner/_repo/projects'
import { Methods as Methods3 } from './users/_username/projects'

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
    rate_limit: {
      get: (option?: { config?: T }) =>
        client.fetch<Methods1['get']['resBody']>(prefix, '/rate_limit', 'GET', option).json(),
      $get: async (option?: { config?: T }) =>
        (await client.fetch<Methods1['get']['resBody']>(prefix, '/rate_limit', 'GET', option).json()).data
    },
    repos: {
      _owner: (val1: number | string) => ({
        _repo: (val2: number | string) => ({
          projects: {
            get: (option?: { config?: T }) =>
              client.fetch<Methods2['get']['resBody']>(prefix, `/repos/${val1}/${val2}/projects`, 'GET', option).json(),
            $get: async (option?: { config?: T }) =>
              (await client.fetch<Methods2['get']['resBody']>(prefix, `/repos/${val1}/${val2}/projects`, 'GET', option).json()).data
          }
        })
      })
    },
    users: {
      _username: (val3: number | string) => ({
        projects: {
          get: (option?: { config?: T }) =>
            client.fetch<Methods3['get']['resBody']>(prefix, `/users/${val3}/projects`, 'GET', option).json(),
          $get: async (option?: { config?: T }) =>
            (await client.fetch<Methods3['get']['resBody']>(prefix, `/users/${val3}/projects`, 'GET', option).json()).data
        }
      })
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
