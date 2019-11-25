import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import path from 'path'
// import logger from "./utils/logger";
// import uuidv4 from 'uuid/v4';
import * as mongo from './mongo'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import graphQLSchema from './graphQLSchema'

dotenv.config()
const app = express()
// public logs
app.use('/logs', express.static(path.join(__basedir, '.logs')))

app.use(cors())

const getUser = async req => {
  const token = req.headers['token'];
  if (token) {
    try {
      return await jwt.verify(token, 'riddlemethis');
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.')
    }
  }
}

const server = new ApolloServer({
  ...graphQLSchema,
  context: async ({ req }) => {
    if (req) {
      // const me = await getUser(req)
      return {
        // me,
        headers: req.headers,
        models: mongo.models
      }
    }
  }
})

server.applyMiddleware({ app, path: '/graphql' })

app.listen({ port: 3000 }, () => {
  console.log(process.env.MONGO_URL)
  mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/graphql')
  console.log('Apollo Server on http://localhost:3000/graphql')
  console.clear();
})
