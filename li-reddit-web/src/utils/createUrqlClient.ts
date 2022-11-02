import { dedupExchange, fetchExchange} from 'urql'
import { cacheExchange, Cache, QueryInput } from '@urql/exchange-graphcache';
import { LogoutMutation, MeQuery, MeDocument, LoginMutation, RegisterMutation } from '../generated/graphql';
import { betterUpdateQuery } from './betterUpdateQuery';
export const createUrqlClient = (ssrExchange: any) => ({
    url: 'http://localhost:4000/graphql',
  fetchOptions: { 
    credentials: "include" as const,
  },
  exchanges: [dedupExchange, cacheExchange({
    updates: { 
      Mutation: { 
        logout: (_result, args, cache, info) => {
          betterUpdateQuery<LogoutMutation, MeQuery>(
            cache,
            {query: MeDocument},
            _result,
            //update and set the *me value in the me query to null
            () => ({me: null})
          )
        },
        login: (_result, args, cache, info) => {
          //a generic to update the cache
          betterUpdateQuery<LoginMutation, MeQuery>(cache, 
            {query: MeDocument},
            _result,
            (result, query) => {
              if(result.login.errors){
                return query
              }else{ 
                return { 
                  me: result.login.user
                }
              }
            })

        },
        register: (_result, args, cache, info) => {
          betterUpdateQuery<RegisterMutation, MeQuery>(cache, 
            {query: MeDocument},
            _result,
            (result, query) => {
              if(result.register.errors){
                return query
              }else{ 
                return { 
                  me: result.register.user
                }
              }
            })

        },
      }
    }
  }),ssrExchange, fetchExchange],
})