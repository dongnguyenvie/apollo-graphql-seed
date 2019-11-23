import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { AuthenticationError } from 'apollo-server'

export default {
  Query: {
    user: async (parent, { id }, { models, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated')
      }
      const user = await models.user.findById({ _id: id }).exec()
      return user
    },
    login: async (parent, { name, password }, { models }, info) => {
      const user = await models.user.findOne({ name }).exec()

      if (!user) {
        throw new AuthenticationError('Invalid credentials')
      }

      const matchPasswords = bcrypt.compareSync(password, user.password)

      if (!matchPasswords) {
        throw new AuthenticationError('Invalid credentials')
      }

      const token = jwt.sign({ id: user.id }, 'riddlemethis', { expiresIn: 24 * 10 * 50 })

      return {
        token
      }
    }
  },
  Mutation: {
    createUser: async (parent, { name, password }, { models }, info) => {
      const user = await models.user.create({ name, password })
      return user
    }
  }
}
