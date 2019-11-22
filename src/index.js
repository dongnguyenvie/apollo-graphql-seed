import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import path from 'path'
// import logger from "./utils/logger";
// import uuidv4 from 'uuid/v4';
import * as mongo from './mongo'
import mongoose from 'mongoose'
import graphQLSchema from './graphQLSchema'

const app = express()
// public logs
app.use('/logs', express.static(path.join(__basedir, '.logs')))

app.use(cors())

const getUser = async req => {
  // const token = req.headers['token'];
  let token = true
  if (token) {
    try {
      return { id: 1, name: 'dong_nguyen' }
      // return await jwt.verify(token, 'riddlemethis');
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.')
    }
  }
}

const server = new ApolloServer({
  ...graphQLSchema,
  context: async ({ req }) => {
    if (req) {
      const me = await getUser(req)

      return {
        me,
        models: mongo.models
      }
    }
  }
})

server.applyMiddleware({ app, path: '/graphql' })

app.listen({ port: 3000 }, () => {
  mongoose.connect('mongodb://localhost:27017/graphql')
  console.log('Apollo Server on http://localhost:3000/graphql')
})
