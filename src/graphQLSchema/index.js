import resolvers from './resolvers'
import types from './types'

const graphQLSchema = {
  typeDefs: types,
  resolvers
}

export default graphQLSchema
