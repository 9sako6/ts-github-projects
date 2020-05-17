/* eslint-disable */
import { AspidaClient } from 'aspida'
import { Methods as Methods0 } from './orgs/_org/projects'
import { Methods as Methods1 } from './projects/_column_project_id/columns'
import { Methods as Methods2 } from './projects/_project_id'
import { Methods as Methods3 } from './projects/columns/_cards_column_id/cards'
import { Methods as Methods4 } from './projects/columns/_column_id'
import { Methods as Methods5 } from './projects/columns/_move_column_id/moves'
import { Methods as Methods6 } from './projects/columns/cards/_card_id'
import { Methods as Methods7 } from './projects/columns/cards/_move_card_id/moves'
import { Methods as Methods8 } from './rate_limit'
import { Methods as Methods9 } from './repos/_owner/_repo/projects'
import { Methods as Methods10 } from './user/projects'
import { Methods as Methods11 } from './users/_username/projects'

const api = <T>(client: AspidaClient<T>) => {
  const prefix = (client.baseURL === undefined ? '' : client.baseURL).replace(/\/$/, '')

  return {
    orgs: {
      _org: (val0: number | string) => ({
        projects: {
          get: (option?: { query?: Methods0['get']['query'], config?: T }) =>
            client.fetch<Methods0['get']['resBody']>(prefix, `/orgs/${val0}/projects`, 'GET', option).json(),
          $get: async (option?: { query?: Methods0['get']['query'], config?: T }) =>
            (await client.fetch<Methods0['get']['resBody']>(prefix, `/orgs/${val0}/projects`, 'GET', option).json()).data,
          post: (option: { data: Methods0['post']['reqBody'], config?: T }) =>
            client.fetch<Methods0['post']['resBody']>(prefix, `/orgs/${val0}/projects`, 'POST', option).json(),
          $post: async (option: { data: Methods0['post']['reqBody'], config?: T }) =>
            (await client.fetch<Methods0['post']['resBody']>(prefix, `/orgs/${val0}/projects`, 'POST', option).json()).data
        }
      })
    },
    projects: {
      _column_project_id: (val1: number | string) => ({
        columns: {
          get: (option?: { config?: T }) =>
            client.fetch<Methods1['get']['resBody']>(prefix, `/projects/${val1}/columns`, 'GET', option).json(),
          $get: async (option?: { config?: T }) =>
            (await client.fetch<Methods1['get']['resBody']>(prefix, `/projects/${val1}/columns`, 'GET', option).json()).data,
          post: (option: { data: Methods1['post']['reqBody'], config?: T }) =>
            client.fetch<Methods1['post']['resBody']>(prefix, `/projects/${val1}/columns`, 'POST', option).json(),
          $post: async (option: { data: Methods1['post']['reqBody'], config?: T }) =>
            (await client.fetch<Methods1['post']['resBody']>(prefix, `/projects/${val1}/columns`, 'POST', option).json()).data
        }
      }),
      _project_id: (val2: number | string) => ({
        get: (option?: { config?: T }) =>
          client.fetch<Methods2['get']['resBody']>(prefix, `/projects/${val2}`, 'GET', option).json(),
        $get: async (option?: { config?: T }) =>
          (await client.fetch<Methods2['get']['resBody']>(prefix, `/projects/${val2}`, 'GET', option).json()).data,
        delete: (option?: { config?: T }) =>
          client.fetch<void>(prefix, `/projects/${val2}`, 'DELETE', option).send(),
        $delete: async (option?: { config?: T }) =>
          (await client.fetch<void>(prefix, `/projects/${val2}`, 'DELETE', option).send()).data,
        patch: (option: { data: Methods2['patch']['reqBody'], config?: T }) =>
          client.fetch<Methods2['patch']['resBody']>(prefix, `/projects/${val2}`, 'PATCH', option).json(),
        $patch: async (option: { data: Methods2['patch']['reqBody'], config?: T }) =>
          (await client.fetch<Methods2['patch']['resBody']>(prefix, `/projects/${val2}`, 'PATCH', option).json()).data
      }),
      columns: {
        _cards_column_id: (val3: number | string) => ({
          cards: {
            get: (option?: { config?: T }) =>
              client.fetch<Methods3['get']['resBody']>(prefix, `/projects/columns/${val3}/cards`, 'GET', option).json(),
            $get: async (option?: { config?: T }) =>
              (await client.fetch<Methods3['get']['resBody']>(prefix, `/projects/columns/${val3}/cards`, 'GET', option).json()).data,
            post: (option: { data: Methods3['post']['reqBody'], config?: T }) =>
              client.fetch<Methods3['post']['resBody']>(prefix, `/projects/columns/${val3}/cards`, 'POST', option).json(),
            $post: async (option: { data: Methods3['post']['reqBody'], config?: T }) =>
              (await client.fetch<Methods3['post']['resBody']>(prefix, `/projects/columns/${val3}/cards`, 'POST', option).json()).data
          }
        }),
        _column_id: (val4: number | string) => ({
          get: (option?: { config?: T }) =>
            client.fetch<Methods4['get']['resBody']>(prefix, `/projects/columns/${val4}`, 'GET', option).json(),
          $get: async (option?: { config?: T }) =>
            (await client.fetch<Methods4['get']['resBody']>(prefix, `/projects/columns/${val4}`, 'GET', option).json()).data,
          patch: (option: { data: Methods4['patch']['reqBody'], config?: T }) =>
            client.fetch<Methods4['patch']['resBody']>(prefix, `/projects/columns/${val4}`, 'PATCH', option).json(),
          $patch: async (option: { data: Methods4['patch']['reqBody'], config?: T }) =>
            (await client.fetch<Methods4['patch']['resBody']>(prefix, `/projects/columns/${val4}`, 'PATCH', option).json()).data,
          delete: (option?: { config?: T }) =>
            client.fetch<void>(prefix, `/projects/columns/${val4}`, 'DELETE', option).send(),
          $delete: async (option?: { config?: T }) =>
            (await client.fetch<void>(prefix, `/projects/columns/${val4}`, 'DELETE', option).send()).data
        }),
        _move_column_id: (val5: number | string) => ({
          moves: {
            post: (option: { data: Methods5['post']['reqBody'], config?: T }) =>
              client.fetch<void>(prefix, `/projects/columns/${val5}/moves`, 'POST', option).send(),
            $post: async (option: { data: Methods5['post']['reqBody'], config?: T }) =>
              (await client.fetch<void>(prefix, `/projects/columns/${val5}/moves`, 'POST', option).send()).data
          }
        }),
        cards: {
          _card_id: (val6: number | string) => ({
            get: (option?: { config?: T }) =>
              client.fetch<Methods6['get']['resBody']>(prefix, `/projects/columns/cards/${val6}`, 'GET', option).json(),
            $get: async (option?: { config?: T }) =>
              (await client.fetch<Methods6['get']['resBody']>(prefix, `/projects/columns/cards/${val6}`, 'GET', option).json()).data,
            patch: (option: { data: Methods6['patch']['reqBody'], config?: T }) =>
              client.fetch<Methods6['patch']['resBody']>(prefix, `/projects/columns/cards/${val6}`, 'PATCH', option).json(),
            $patch: async (option: { data: Methods6['patch']['reqBody'], config?: T }) =>
              (await client.fetch<Methods6['patch']['resBody']>(prefix, `/projects/columns/cards/${val6}`, 'PATCH', option).json()).data,
            delete: (option?: { config?: T }) =>
              client.fetch<void>(prefix, `/projects/columns/cards/${val6}`, 'DELETE', option).send(),
            $delete: async (option?: { config?: T }) =>
              (await client.fetch<void>(prefix, `/projects/columns/cards/${val6}`, 'DELETE', option).send()).data
          }),
          _move_card_id: (val7: number | string) => ({
            moves: {
              post: (option: { data: Methods7['post']['reqBody'], config?: T }) =>
                client.fetch<void>(prefix, `/projects/columns/cards/${val7}/moves`, 'POST', option).send(),
              $post: async (option: { data: Methods7['post']['reqBody'], config?: T }) =>
                (await client.fetch<void>(prefix, `/projects/columns/cards/${val7}/moves`, 'POST', option).send()).data
            }
          })
        }
      }
    },
    rate_limit: {
      get: (option?: { config?: T }) =>
        client.fetch<Methods8['get']['resBody']>(prefix, '/rate_limit', 'GET', option).json(),
      $get: async (option?: { config?: T }) =>
        (await client.fetch<Methods8['get']['resBody']>(prefix, '/rate_limit', 'GET', option).json()).data
    },
    repos: {
      _owner: (val8: number | string) => ({
        _repo: (val9: number | string) => ({
          projects: {
            get: (option?: { query?: Methods9['get']['query'], config?: T }) =>
              client.fetch<Methods9['get']['resBody']>(prefix, `/repos/${val8}/${val9}/projects`, 'GET', option).json(),
            $get: async (option?: { query?: Methods9['get']['query'], config?: T }) =>
              (await client.fetch<Methods9['get']['resBody']>(prefix, `/repos/${val8}/${val9}/projects`, 'GET', option).json()).data,
            post: (option: { data: Methods9['post']['reqBody'], config?: T }) =>
              client.fetch<Methods9['post']['resBody']>(prefix, `/repos/${val8}/${val9}/projects`, 'POST', option).json(),
            $post: async (option: { data: Methods9['post']['reqBody'], config?: T }) =>
              (await client.fetch<Methods9['post']['resBody']>(prefix, `/repos/${val8}/${val9}/projects`, 'POST', option).json()).data
          }
        })
      })
    },
    user: {
      projects: {
        post: (option: { data: Methods10['post']['reqBody'], config?: T }) =>
          client.fetch<Methods10['post']['resBody']>(prefix, '/user/projects', 'POST', option).json(),
        $post: async (option: { data: Methods10['post']['reqBody'], config?: T }) =>
          (await client.fetch<Methods10['post']['resBody']>(prefix, '/user/projects', 'POST', option).json()).data
      }
    },
    users: {
      _username: (val10: number | string) => ({
        projects: {
          get: (option?: { query?: Methods11['get']['query'], config?: T }) =>
            client.fetch<Methods11['get']['resBody']>(prefix, `/users/${val10}/projects`, 'GET', option).json(),
          $get: async (option?: { query?: Methods11['get']['query'], config?: T }) =>
            (await client.fetch<Methods11['get']['resBody']>(prefix, `/users/${val10}/projects`, 'GET', option).json()).data
        }
      })
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
