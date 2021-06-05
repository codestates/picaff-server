import User from '@entity/User.entity'
import token from '@middleware/jwt'
import { Response, Request } from 'express'
import { getConnection } from 'typeorm'
import { default as interfaces } from '@interface/index'

const signOff = async (req: Request, res: Response) => {
  console.log(req.headers.authorization)
  console.log(req.body)
  if (!req.headers.authorization) {
    return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' })
  } else {
    const accessToken = req.headers.authorization.split(' ')[1]

    try {
      const verifyToken = token.verifyToken(accessToken)
      const userInfo = await interfaces.getUserInfo(verifyToken.email)
      if (userInfo.type !== 'normal') {
        return res.status(401).send({ message: 'Oauth 유저는 회원탈퇴가 불가능합니다.' })
      } else {
        const { id } = userInfo
        await getConnection().createQueryBuilder().delete().from(User).where({ id: id }).execute()
        return res.status(200).cookie('refreshToken', '').send()
      }
    } catch (err) {
      if (err.name) {
        /** 토큰이 만료되거나, 잘못된 엑세스 토큰으로 로그아웃 시도할때 **/
        return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' })
      }
      /** 토큰으로 찾아낸 userId에 해당하는 유저가 데이터베이스에 존재하지 않을때 **/
      return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' })
    }
  }
}

export default signOff
