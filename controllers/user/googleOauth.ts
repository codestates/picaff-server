import token from '@middleware/jwt'
import 'dotenv/config'
import User from '@entity/User.entity' // 추가
import { Request, Response } from 'express'
import { LoginTicket, OAuth2Client } from 'google-auth-library'
import { getConnection } from 'typeorm' // 추가
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
        const googleOauthIdType = 'Oauth'

        if (checkUser) {
          // 우리 db에 가입자가있을경우..
          // 방법 1.
          await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({ type: googleOauthIdType })
            .where({ email: email })
            .execute() // 기존 gmail 유저정보를 그대로 받아다, type만 id update 하는 방법 >
          // 이렇게 되면 기존 일반 gmail 이용자 아이디 자체가 사라지고, 앞으로 Oauth 로그인만 해야 함.

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
          // 방법 1 끝.

          //방법 2 > 기존 gmail 가입자의 Oauth 로그인 자체를 막아버리는 것.
          const checkUser = await interfaces.getUserInfo(email)
          if (checkUser) {
            return res
              .status(400)
              .send({ message: '기존 가입자입니다. 일반 로그인을 진행해 주세요.' })
          }
          // 방법 2는 Oauth 유저는
          // 방법 2 끝
          // 방법 3은 한 유저가 gyutae@gmail.com 일반아이디 유저가 일반 아이디로 로그인, gmail Oauth 로그인 할 때
          // 각각 다른 로그인 정보를 가지게 되는 방법인데 이건 가장 하책인 것 같습니다.
          // 방법 1, 2 둘 중에 나은 방안을 선택하시면 될 것 같습니다...
        } else {
          // db에 아이디가 없을 경우.
          await interfaces.createUser(email, userName, password, googleOauthIdType)
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
