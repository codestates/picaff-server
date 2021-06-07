import token from '@middleware/jwt'
import { Response, Request } from 'express'
import { default as interfaces } from '@interface/index'
import crypt from '@middleware/bcrypt'

const modification = async (req: Request, res: Response) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' })
  } else {
    const newUserName: string = req.body.userName
    const newPassword: string = req.body.password
    const accessToken: string = req.headers.authorization.split(' ')[1]
    try {
      const verifyToken = token.verifyToken(accessToken)
      if (newUserName && newUserName !== '') {
        const userInfo = await interfaces.editUserInfo('userName', newUserName, verifyToken.id)
        const { id, email, userName } = userInfo
        return res.status(202).send({ id: id, email: email, userName: userName })
      } else if (newPassword && newPassword !== '') {
        const hashPassword = await crypt.cryptPassword(newPassword)
        const userInfo = await interfaces.editUserInfo('password', hashPassword, verifyToken.id)
        const { id, email, userName } = userInfo
        return res.status(202).send({ id: id, email: email, userName: userName })
      } else {
        return res.status(403).send({ message: '정확한 정보를 입력해주세요' })
      }
    } catch (err) {
      if (err.name) {
        /** 토큰이 만료되거나, 잘못된 엑세스 토큰으로 로그아웃 시도할때 **/
        return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' })
      }
      /** 토큰으로 찾아낸 userId에 해당하는 유저가 데이터베이스에 존재하지 않을때 **/
      return res.status(404).send({ message: '회원 정보가 일치하지 않습니다.' })
    }
  }
}

export default modification
