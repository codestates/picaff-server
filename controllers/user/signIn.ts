import token from '@middleware/jwt'
import { Response, Request } from 'express'
import { default as interfaces } from '@interface/index'

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === undefined || email === null || email === '') {
    return res.status(403).send({ message: '아이디와 비밀번호를 확인해주세요.' })
  } else if (password === undefined || password === null) {
    return res.status(403).send({ message: '아이디와 비밀번호를 확인해주세요.' })
  }
  try {
    const userInfo = await interfaces.pickUserInfo(req.body.email)
    const { id, email, userName } = userInfo
    if (userInfo.password === req.body.password) {
      const accessToken = token.generateAccessToken(id, email, userName)
      const refreshToken = token.generateRefreshToken(id, email, userName)
      return res
        .status(200)
        .cookie('refreshToken', refreshToken, { httpOnly: true })
        .send({
          data: {
            id: id,
            userName: userName,
            email: email,
            auth: {
              accessToken: accessToken,
            },
          },
        })
    } else {
      return res.status(403).send({ message: '아이디와 비밀번호를 확인해주세요.' })
    }
  } catch (err) {
    /** 토큰으로 찾아낸 userId에 해당하는 유저가 데이터베이스에 존재하지 않을때
     ** 또는 토큰정보가 잘못되었거나, 토큰의 유효기간이 만료되었을때       **/
    return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' })
  }
}

export default signIn
