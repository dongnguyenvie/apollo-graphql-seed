import express from "express";
import cors from "cors";
import { ApolloServer, gql } from "apollo-server-express";
import logger from "./utils/logger";
import path from "path";
import uuidv4 from 'uuid/v4';
import schema from './schema'
// logger.info(`info 127.0.0.1 -, ${uuidv4()}`);
// logger.error("error 127.0.0.1 - there's no place like home2222222222");

const app = express();
// public logs
app.use("/logs", express.static(path.join(__basedir, ".logs")));

app.use(cors());

let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
    messageIds: [1],
  },
  2: {
    id: '2',
    username: 'Dave Davids',
    messageIds: [2],
  },
};

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2',
  },
};

const resolvers = {
  /**
   * Query
   */
  Query: {
    me: (parent, args, context) => {
      return context.me;
    },
    user: (parent, { id }) => {
      return users[id];
    },
    users: (parent, args, context) => {
      return Object.values(context.users)
    },
    messages: (parent, args, context) => {
      return Object.values(messages)
    },
    message: (parent, args, context) => {
      return messages[args.id];
    }
  },

  /**
   * Multation
   */
  Mutation: {
    createMessage: (parent, args, { me }) => {
      const id = uuidv4();
      const { text } = args
      const message = {
        id,
        text,
        userId: me.id,
      };
      messages[id] = message;
      users[me.id].messageIds.push(id);
      return message;
    },
  },

  /**
   * Same controller
   */
  User: {
    username: parent => {
      return parent.username;
    },
    id: parent => {
      return `format output id: ${parent.id}`
    },
    messages: (user, args, context) => {
      return Object.values(messages).filter(
        message => message.userId === user.id,
      );
    }
  },
  Message: {
    user: (parent, args, context) => {
      console.log(`parent`, parent)
      return context.users[parent.userId];
    },
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers, // 
  context: { // Same model
    me: users[1],
    users: users
  },
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 3000 }, () => {
  console.log("Apollo Server on http://localhost:3000/graphql");
});
