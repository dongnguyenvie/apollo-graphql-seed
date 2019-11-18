import { gql } from 'apollo-server-express';
export default gql`
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User
    messages: [Message!]!
    message(id: ID!): Message!
  }
  type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }
  type User {
    id: ID!
    username: String!
    messages: [Message!]
  }
  type Message {
    id: ID!
    text: String!
    user: User!
  }
`;
// ./graphql/typeDefs.js
import path from 'path';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

const typesArray = fileLoader(path.join(__dirname, './queries'));
console.log(`typesArray`, typesArray)

export default mergeTypes(typesArray, { all: true });