import { Response, Request } from 'express'
import { default as interfaces } from '@interface/index'
import crypt from '@middleware/bcrypt'

const signUp = async (req: Request, res: Response) => {
  try {
    const isSignUpUser = await interfaces.isCheckedUser(req.body.email)
    if (isSignUpUser) {
      return res.status(403).send({ message: '이미 가입되어 있는 이메일 주소입니다.' })
    } else {
      if (req.body.email === '' || req.body.email === null) {
        return res.status(404).send({ message: '정확한 정보를 입력해 주십시오.' })
      } else {
        const password = await crypt.cryptPassword(req.body.password)
        if (!password) return res.status(404).send({ message: '정확한 정보를 입력해 주십시오.' })
        const user = await interfaces.createUser(req.body.email, req.body.userName, password)
        const userInfo = await interfaces.getUserInfo(user.email)
        const { id, email, userName } = userInfo
        res.status(201).send({
          id: id,
          email: email,
          userName: userName,
        })
      }
    }
  } catch (err) {
    return res.status(404).send({ message: '정확한 정보를 입력해 주십시오.' })
  }
}

export default signUp
