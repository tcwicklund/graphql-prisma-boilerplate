import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import seedDatabase, { userOne, userTwo } from './utils/seedDatabase'
import { createUser, getUsers, login, getProfile } from './utils/operations'
import getClient from './utils/getClient'

const client = getClient()

beforeEach(seedDatabase)

test('Should create a new user', async () => {
  const variables = {
    data: {
      name:'Travis',
      email:'travis@example.com',
      password:'MyPass123'
    }
  }

  const { data } = await client.mutate({
    mutation: createUser,
    variables
  })

  const exists = await prisma.exists.User({ id: data.createUser.user.id })
  expect(exists).toBe(true)
})

test('Should expose public author profiles', async () => {
  const response = await client.query({ query: getUsers })

  expect(response.data.users.length).toBe(2)
  expect(response.data.users[0].email).toBe(null)
  expect(response.data.users[0].name).toBe(userOne.user.name)
})

test('Should not login with bad credentials', async () => {
  const variables = {
    data: {
      email:'test.user@example.com',
      password:'blue54321'
    }
  }

  await expect(client.mutate({ mutation: login, variables })).rejects.toThrow()
})

test('Should not allow user to signup with invalid password', async () => {
  const variables = {
    data: {
      name: 'Test User2',
      email: 'test.user2@example.com',
      password: 'pass'
    }
  }

  await expect(client.mutate({ mutation: createUser, variables })).rejects.toThrow()
})

test('Should fetch user profile', async () => {
  const client = getClient(userOne.jwt)
  const { data } = await client.query({ query: getProfile })

  expect(data.me.id).toBe(userOne.user.id)
  expect(data.me.name).toBe(userOne.user.name)
  expect(data.me.email).toBe(userOne.user.email)
})
