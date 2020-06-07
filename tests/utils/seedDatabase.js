import prisma from '../../src/prisma'
import bcrypt from 'bcryptjs'
import generateToken from '../../src/utils/generateToken'

const userOne = {
  input: {
    name: 'Test User',
    email: 'test.user@test.com',
    password: bcrypt.hashSync('TestPass123!')
  },
  user: undefined,
  jwt: undefined
}

const userTwo = {
  input: {
    name: 'Another User',
    email: 'another.user@test.com',
    password: bcrypt.hashSync('AnotherPass123!')
  },
  user: undefined,
  jwt: undefined
}

const seedDatabase = async () => {
  await prisma.mutation.deleteManyUsers()

  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  })
  userOne.jwt = generateToken(userOne.user.id)

  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input
  })
  userTwo.jwt = generateToken(userTwo.user.id)

}

export { seedDatabase as default, userOne, userTwo }
