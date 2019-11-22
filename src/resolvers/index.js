import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { gql } from 'apollo-server-express';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

const typesArray = fileLoader(path.join(__dirname, './types'));
const queriesArray = fileLoader(path.join(__dirname, './queries'));
const multationsArray = fileLoader(path.join(__dirname, './mutations'));
const rootQueriesArray = fileLoader(path.join(__dirname, './rootQueries'));

export const types = mergeTypes([linkSchema, ...typesArray], { all: true });
export const queries = mergeResolvers(queriesArray, { all: true });
export const multations = mergeResolvers(multationsArray, { all: true });
export const rootQueries = mergeResolvers(rootQueriesArray, { all: true });