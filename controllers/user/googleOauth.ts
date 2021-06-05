import token from '@middleware/jwt'
import 'dotenv/config'
import { Request, Response } from 'express'
import { LoginTicket, OAuth2Client } from 'google-auth-library'
import { default as interfaces } from '@interface/index'

const googleOauth = async (req: Request, res: Response) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
  const myToken: string = req.body.id_token

  async function verify() {
    const ticket: LoginTicket = await client.verifyIdToken({
      idToken: myToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    const payload = ticket.getPayload()
    if (typeof payload !== 'undefined') {
      const email = payload['email']!
      const userName = payload['name']!
      const password = payload['sub']!

      if (payload.email_verified) {
        const checkUser = await interfaces.getGoogleUserInfo(email)
        if (checkUser) {
          const accessToken = token.generateAccessToken(
            checkUser.id,
            checkUser.email,
            checkUser.userName
          )
          const refreshToken = token.generateRefreshToken(
            checkUser.id,
            checkUser.email,
            checkUser.userName
          )
          return res
            .status(200)
            .cookie('refreshToken', refreshToken, { httpOnly: true })
            .send({
              id: checkUser.id,
              userName: checkUser.userName,
              email: checkUser.email,
              auth: {
                accessToken: accessToken,
                refreshToken: refreshToken,
              },
            })
        } else {
          await interfaces.createUser(email, userName, password)
          const userInfo = await interfaces.getUserInfo(email)

          const accessToken = token.generateAccessToken(
            userInfo.id,
            userInfo.email,
            userInfo.userName
          )
          const refreshToken = token.generateRefreshToken(
            userInfo.id,
            userInfo.email,
            userInfo.userName
          )

          return res
            .status(201)
            .cookie('refreshToken', refreshToken, { httpOnly: true })
            .send({
              id: userInfo.id,
              userName: userInfo.userName,
              email: userInfo.email,
              auth: {
                accessToken: accessToken,
                refreshToken: refreshToken,
              },
            })
        }
      } else {
        return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' })
      }
    } else {
      return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' })
    }
  }

  verify().catch((err) => {
    return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' })
  })
}

export default googleOauth
