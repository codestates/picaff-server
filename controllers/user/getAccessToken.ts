import token from '@middleware/jwt'
import { Response, Request } from 'express'

const getAccessToken = async (req: Request, res: Response) => {
  console.log(req.headers.cookie);
  if (!req.headers.cookie) {
    return res.status(401).send({ message: '권한이 없습니다.' })
  } else {
    const refreshToken = req.headers.cookie.split('=')[1]
    try {
      const userInfo = token.verifyRefreshToken(refreshToken)
      const { id, email, userName } = userInfo
      const accessToken = token.generateAccessToken(id, email, userName)
      return res.status(400).send({ accessToken })
    } catch (err) {
      if (err.name) {
        /** 토큰이 만료되거나, 잘못된 엑세스 토큰으로 로그아웃 시도할때 **/
        return res.status(401).send({ message: '권한이 없습니다.' })
      }
      /** 토큰으로 찾아낸 userId에 해당하는 유저가 데이터베이스에 존재하지 않을때 **/
      return res.status(401).send({ message: '권한이 없습니다.' })
    }
  }
}

export default getAccessToken
