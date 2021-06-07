import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { tokenUser, userInfo } from '@interface/type'
import { error } from 'console'
dotenv.config()
const ACCESS_SECRET = process.env.ACCESS_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET

const token = {
  generateAccessToken(id: number, email: string, userName: string, type: string) {
    const userInfo: userInfo = {
      id: id,
      userName: userName,
      email: email,
      type: type,
    }
    const accessToken: string = jwt.sign(userInfo, ACCESS_SECRET!, { expiresIn: '1h' })
    return accessToken
  },
  generateRefreshToken(id: number, email: string, userName: string, type: string) {
    const userInfo: userInfo = {
      id: id,
      userName: userName,
      email: email,
      type: type,
    }
    const RefreshToken = jwt.sign(userInfo, REFRESH_SECRET!, { expiresIn: '10h' })
    return RefreshToken
  },
  verifyToken(token: string) {
    const userInfo = jwt.verify(token, ACCESS_SECRET!)
    if (typeof userInfo === 'object') return userInfo as tokenUser
    else throw new Error('token err')
  },
  verifyRefreshToken(token: string) {
    const userInfo = jwt.verify(token, REFRESH_SECRET!)
    if (typeof userInfo === 'object') return userInfo as tokenUser
    else throw error('String err')
  },
}

export default token
