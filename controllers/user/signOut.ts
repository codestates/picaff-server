import User from '@entity/User.entity'
import token from '@middleware/jwt'
import { Response, Request } from 'express'
import { tokenUser } from '@interface/type'
import { getRepository } from 'typeorm'

const signOut = async (req: Request, res: Response) => {
  // if (!req.headers.authorization) {
  //   return res.status(401).send({ message: '현재 로그인 중이 아닙니다.' })
  // } else {
  //   const accessToken = req.headers.authorization.split(' ')[1]
  //   try {
  //     const verifyToken = token.verifyToken(accessToken) as tokenUser
  //     const userRepository = getRepository(User)
  //     const userInfo = (await userRepository.findOne({
  //       where: { email: verifyToken.email },
  //     })) as tokenUser
  //     if (verifyToken.email === userInfo.email) {
  //       return res
  //         .status(200)
  //         .cookie('refreshToken', '')
  //         .send({ message: '로그아웃에 성공하였습니다.' })
  //     } else {
  //       return res.status(401).send({ message: '잘못된 회원정보입니다.' })
  //     }
  //   } catch {
  //     return res.status(401).send({ message: '리프레쉬 토큰 사용 요망' })
  //   }
  // }
}

export default signOut
