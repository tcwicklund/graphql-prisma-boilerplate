import bcrypt from 'bcryptjs'

const hashPassword = (password) => {

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters.')
  }

  return bcrypt.hash(password, 10) // second argument is the SALT
}

export { hashPassword as default }
