import express from "express";
import cors from "cors";
import { ApolloServer, gql } from "apollo-server-express";
import logger from "./utils/logger";
import path from "path";
import uuidv4 from 'uuid/v4';

// logger.info(`info 127.0.0.1 -, ${uuidv4()}`);
// logger.error("error 127.0.0.1 - there's no place like home2222222222");

const app = express();
// public logs
app.use("/logs", express.static(path.join(__basedir, ".logs")));

app.use(cors());

let users = {
  1: {
    id: "1",
    username: "Robin Wieruch id=1"
  },
  2: {
    id: "2",
    username: "Dave Davids id=2"
  }
};

const schema = gql`
  type Query {
    user(id: ID!): User
    users: [User!]
    me: User
  }
  type User {
    username: String!
    id: String
  }
`;

const resolvers = {
  Query: {
    me: (parent, args, context) => {
      return context.me;
    },
    user: (parent, { id }) => {
      return users[id];
    },
    users: (parent, args, context) => {
      return Object.values(context.users)
    }
  },
  User: {
    username: parent => {
      console.log(`parent`, parent)
      return parent.username;
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers, // 
  context: { // Same controller
    me: users[1],
    users: users
  },
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 3000 }, () => {
  console.log("Apollo Server on http://localhost:3000/graphql");
});
