import bcrypt from 'bcryptjs'

const crypt = {
  cryptPassword(password: string) {
    return bcrypt.hash(password, 8)
  },
  comparePassword(password: string, encodedPassword: string) {
    return bcrypt.compareSync(password, encodedPassword)
  },
}

export default crypt
