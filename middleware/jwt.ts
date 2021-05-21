import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { tokenUser } from '@interface/type'
dotenv.config()

const ACCESS_SECRET = process.env.ACCESS_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET

const token = {
  generateAccessToken(id: number, email: string, userName: string) {
    const userInfo = {
      id: id,
      userName: userName,
      email: email,
    }
    const accessToken = jwt.sign(userInfo, ACCESS_SECRET!, { expiresIn: '1h' })
    return accessToken
  },
  generateRefreshToken(id: number, email: string, userName: string) {
    const userInfo = {
      id: id,
      userName: userName,
      email: email,
    }
    const RefreshToken = jwt.sign(userInfo, REFRESH_SECRET!, {
      expiresIn: '1h',
    })
    return RefreshToken
  },
  verifyToken(token: string) {
    // const verifyToken:tokenUser = jwt.verify(token, ACCESS_SECRET!);
    jwt.verify(token, ACCESS_SECRET!, (authorizedData, err) => {
      if (err) return err
      else {
        return authorizedData
      }
    })
    // return jwt.verify(token, ACCESS_SECRET!);
  },
}

export default token
