import {Cache, QueryInput } from '@urql/exchange-graphcache';

//update query after our mutation fires
     //mutation we pass in, and query is the query that we want to modify
    export  const betterUpdateQuery = <Result, Query> (  cache: Cache, qi: QueryInput, result: any, fn: (r: Result, q: Query) => Query)=> {
        return cache.updateQuery(qi, data => fn(result, data as any) as any);
        }