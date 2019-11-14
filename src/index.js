import express from "express";
import cors from "cors";
import { ApolloServer, gql } from "apollo-server-express";
import logger from "./utils/logger";
import path from "path";
import uuidv4 from 'uuid/v4';

// logger.info("info 127.0.0.1 - there's no place like home111111111");
// logger.error("error 127.0.0.1 - there's no place like home2222222222");

const app = express();
// public logs
app.use("/logs", express.static(path.join(__basedir, ".logs")));

app.use(cors());

let users = {
  1: {
    id: "1",
    username: "Robin Wieruch1111"
  },
  2: {
    id: "2",
    username: "Dave Davids1111"
  }
};

const schema = gql`
  type Query {
    me: User
    user(id: ID!): User
  }
  type User {
    username: String!
  }
`;

const resolvers = {
  Query: {
    user: (parent, { id }) => {
      console.log(parent, id);
      return users[id];
    },
    me: (parent, args, context) => {
      console.log(`context`, context)
      return context.me;
    },
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers, // 
  context: { // Same controller
    me: users[1],
  },
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 3000 }, () => {
  console.log("Apollo Server on http://localhost:3000/graphql");
});
