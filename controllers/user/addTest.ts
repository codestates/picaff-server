import token from '@middleware/jwt'
import { Response, Request } from 'express'
import { default as interfaces } from '@interface/index'

const addTest = async (req: Request, res: Response) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' })
  } else {
    const accessToken = req.headers.authorization.split(' ')[1]
    try {
      const verifyToken = token.verifyToken(accessToken)
      const testInfo = await interfaces.getTestResultInfo(
        verifyToken.id,
        req.body.testId,
        true
      )
      if (typeof testInfo === 'object') {
        return res.status(202).send(testInfo[0])
      } else {
        return res.status(404).send({ message: testInfo })
      }
    } catch (err) {
      if (err.name) {
        /** 토큰이 만료되거나, 잘못된 엑세스 토큰으로 로그아웃 시도할때 **/
        return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' })
      }
      /** 토큰으로 찾아낸 userId에 해당하는 유저가 데이터베이스에 존재하지 않을때 **/
      return res.status(404).send({ message: '회원 정보와 설문조사 자료가 일치하지 않습니다.' })
    }
  }
}

export default addTest
