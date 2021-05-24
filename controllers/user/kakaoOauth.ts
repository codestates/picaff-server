import { Request, Response } from 'express'
import token from '@middleware/jwt'
import axios from 'axios'
import { default as interfaces } from '@interface/index'
import { kakaoProperties } from '@interface/type'

const kakaoOauth = async (req: Request, res: Response) => {
  const access_token: string = req.body.access_token

  const verifyTokenInfo = await axios({
    method: 'POST',
    url: 'https://kapi.kakao.com/v2/user/me',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${access_token}`,
    },
  })

  const id: string = verifyTokenInfo.data.id
  const properties: kakaoProperties = verifyTokenInfo.data.properties

  if (verifyTokenInfo.status === 200) {
    const checkUser = await interfaces.getKakaoUserInfo('kakaoUser' + id)
    console.log(checkUser)
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
      res
        .status(200)
        .cookie('refreshToken', refreshToken, { httpOnly: true })
        .send({
          id: checkUser.id,
          userName: checkUser.userName,
          email: checkUser.email,
          auth: {
            accessToken: accessToken,
          },
        })
    } else {
      await interfaces.createUser('kakaoUser' + `${id}`, properties.nickname, 'kakaoOauth')
      const oauthUserInfo = await interfaces.getKakaoUserInfo('kakaoUser' + id)
      if (oauthUserInfo !== undefined) {
        const accessToken = token.generateAccessToken(
          oauthUserInfo.id,
          oauthUserInfo.email,
          oauthUserInfo.userName
        )
        const refreshToken = token.generateRefreshToken(
          oauthUserInfo.id,
          oauthUserInfo.email,
          oauthUserInfo.userName
        )
        res
          .status(201)
          .cookie('refreshToken', refreshToken, { httpOnly: true })
          .send({
            id: oauthUserInfo.id,
            userName: oauthUserInfo.userName,
            email: oauthUserInfo.email,
            auth: {
              accessToken: accessToken,
            },
          })
      }
    }
  }
}

export default kakaoOauth
