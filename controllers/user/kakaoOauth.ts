import { Request, Response } from 'express'
import token from '@middleware/jwt'
import axios from 'axios'
import { getRepository } from 'typeorm'
import User from '../../src/entity/User.entity'

const kakaoOauth = async (req: Request, res: Response) => {
  const access_token: string = req.body

  const verifyTokenInfo = await axios({
    method: 'POST',
    url: 'https://kapi.kakao.com/v2/user/me',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${access_token}`,
    },
  })

  if (verifyTokenInfo.status === 200) {
    const { id, properties } = verifyTokenInfo.data
    const userRepository = getRepository(User)
    const checkUser = await userRepository.find({ where: { email: id } })

    if (checkUser.length > 0) {
      const accessToken = token.generateAccessToken(
        checkUser[0].id,
        checkUser[0].email,
        checkUser[0].userName
      )
      const refreshToken = token.generateRefreshToken(
        checkUser[0].id,
        checkUser[0].email,
        checkUser[0].userName
      )
      res
        .status(200)
        .cookie('refreshToken', refreshToken, { httpOnly: true })
        .send({
          id: checkUser[0].id,
          userName: checkUser[0].userName,
          email: checkUser[0].email,
          auth: {
            accessToken: accessToken,
          },
        })
    } else {
      const user: User = new User()
      user.userName = properties.nickname
      user.email = id
      user.password = 'kakaoOauth'
      await userRepository.save(user)

      const userInfo = await userRepository.findOne({
        where: { email: id },
      })

      if (typeof userInfo !== 'undefined') {
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
        res
          .status(201)
          .cookie('refreshToken', refreshToken, { httpOnly: true })
          .send({
            id: userInfo.id,
            userName: userInfo.userName,
            email: userInfo.email,
            auth: {
              accessToken: accessToken,
            },
          })
      }
    }
  } else {
    res.status(401).send('Invalid access token.')
  }
}

export default kakaoOauth
