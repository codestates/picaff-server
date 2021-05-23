import User from '../../src/entity/User.entity'
import token from '@middleware/jwt'
import 'dotenv/config'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { LoginTicket, OAuth2Client } from 'google-auth-library'
import { error } from 'console'
import { default as interfaces } from '@interface/index'

const googleOauth = async (req: Request, res: Response) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
  const userRepository = getRepository(User)
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
      const password = payload['sub']! // 21자리의 Google 회원 id 번호

      if (payload.email_verified) {
        // const checkUser = await userRepository.find({ where: { email: email } })
        const checkUser = await interfaces.checkUser(email)
        if (checkUser) {
          console.log('checkUser', checkUser)
          console.log('checkUser[0]', checkUser[0])
          const checkPassword = await (checkUser[0].password === password)

          if (checkPassword) {
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
          } else throw error('payload undefined...')
        } else {
          res.status(404).send('log-in failed')
        }
      } else {
        const user: User = new User()
        user.userName = userName
        user.email = email
        user.password = password
        await userRepository.save(user)

        const userInfo = await userRepository.findOne({
          where: { email: email },
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
        } else throw error('userInfo not exists')
      }
    }
  }
  verify().catch((err) => {
    res.status(401).send('Unauthroized. Token used too late.')
  })
}

export default googleOauth
