import User from '../../src/entity/User.entity'
import token from '@middleware/jwt'
import 'dotenv/config'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { OAuth2Client } from 'google-auth-library'
import { TokenPayload } from '@interface/type'

const googleOauth = async (req: Request, res: Response) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
  const userRepository = getRepository(User)
  const myToken: string = req.body.id_token
  async function verify() {
    console.log('Veryfing your token....')
    const ticket = await client.verifyIdToken({
      idToken: myToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    const payload = ticket.getPayload() as TokenPayload
    const email = payload['email']
    const userName = payload['name']
    const password = payload['sub'] // 114431990724931021242 // 21자리의 Google 회원 id 번호

    if (payload.email_verified) {
      const checkUser = await userRepository.find({ where: { email: email } })
      if (checkUser.length > 0) {
        console.log('this user exists in DB: ', email)
        const checkPassword = await (checkUser[0].password === password)
        if (checkPassword) {
          const accessToken = token.generateAccessToken(
            checkUser[0]!.id,
            checkUser[0]!.email,
            checkUser[0]!.userName
          )
          const refreshToken = token.generateRefreshToken(
            checkUser[0]!.id,
            checkUser[0]!.email,
            checkUser[0]!.userName
          )
          console.log('logged in')
          res
            .status(200)
            .cookie('refreshToken', refreshToken, { httpOnly: true })
            .send({
              data: {
                id: checkUser[0]!.id,
                userName: checkUser[0]!.userName,
                email: checkUser[0]!.email,
                auth: {
                  accessToken: accessToken,
                },
              },
            })
        } else {
          res.status(404).send('log-in failed')
        }
      } else {
        console.log('writing the userInfo in DB....')
        const user: User = new User()
        user.userName = userName
        user.email = email
        user.password = password
        await userRepository.save(user)

        const userInfo = await userRepository.findOne({
          where: { email: email },
        })
        const accessToken = token.generateAccessToken(
          userInfo!.id,
          userInfo!.email,
          userInfo!.userName
        )
        const refreshToken = token.generateRefreshToken(
          userInfo!.id,
          userInfo!.email,
          userInfo!.userName
        )
        console.log('sign up & log in completed.')
        res
          .status(201)
          .cookie('refreshToken', refreshToken, { httpOnly: true })
          .send({
            data: {
              id: userInfo!.id,
              userName: userInfo!.userName,
              email: userInfo!.email,
              auth: {
                accessToken: accessToken,
              },
            },
          })
      }
    }
  }
  verify().catch((err) => {
    console.log('expired token.')
    res.status(401).send('Unauthroized. Token used too late.')
  })
}

export default googleOauth
