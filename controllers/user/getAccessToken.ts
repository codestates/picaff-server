import token from '@middleware/jwt'
import { Response, Request } from 'express'

const getAccessToken = async (req: Request, res: Response) => {
  try{
  if (req.headers.cookie && req.headers.cookie !== 'refreshToken=') {
    const refreshToken = req.headers.cookie.split('=')[1]
      const userInfo = token.verifyRefreshToken(refreshToken)
      const { id, email, userName } = userInfo
      const accessToken = token.generateAccessToken(id, email, userName)
      return res.status(400).send({ accessToken })
  } else {
      if(req.body.refreshToken) {
        const refreshToken = req.body.refreshToken
        const userInfo = token.verifyRefreshToken(refreshToken)
        const { id, email, userName } = userInfo
        const accessToken = token.generateAccessToken(id, email, userName)
        return res.status(400).send({ accessToken })
      }else{
        return res.status(401).send({ message: '권한이 없습니다.' })
      }
    }
  } catch (err) {
    return res.status(401).send({ message: '권한이 없습니다.' })
  }
}

export default getAccessToken
