import { default as jwt } from '@middleware/jwt'
import { Response, Request } from 'express'
import { default as interfaces } from '@interface/index'
import { default as test } from '@interface/test'

export default {
  post: async (req: Request, res: Response) => {
    try {
      if (!req.body.score) return res.status(404).send({ message: '설문조사를 다시 진행해주세요' })
      const { score } = req.body
      if (score.includes(null)) {
        return res.status(404).send({ message: '설문조사를 다시 진행해주세요' })
      }
      const arr = score
      const coffeeScore: Array<number> = arr.splice(0, 6)
      const productScore: Array<number> = arr.splice(0, 5)
      const coffeeIndex = test.resultCoffee(coffeeScore)
      const productIndex = test.resultProduct(productScore)
      const isLogin = req.headers.authorization
      if (typeof isLogin === 'string' && isLogin !== 'null') {
        const accessToken = isLogin.split(' ')[1]
        const verifyToken = jwt.verifyToken(accessToken)
        const userInfo = await interfaces.getUserInfo(verifyToken.email, verifyToken.type)
        if (typeof userInfo === 'undefined') {
          return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' })
        }
        if (verifyToken.id !== userInfo.id) {
          return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' })
        }
        const testResultInfo = await interfaces.createTestInfo(
          userInfo.id,
          coffeeIndex,
          productIndex
        )
        const coffeeResult = await interfaces.getItemInfo(coffeeIndex, userInfo.id)
        const productResult = await interfaces.getItemInfo(productIndex, userInfo.id)
        return res.status(200).send({ testResultInfo, coffeeResult, productResult })
      } else {
        const testResultInfo = await interfaces.createTestInfo(null, coffeeIndex, productIndex)
        const coffeeResult = await interfaces.getItemInfo(coffeeIndex, null)
        const productResult = await interfaces.getItemInfo(productIndex, null)
        return res.status(200).send({ testResultInfo, coffeeResult, productResult })
      }
    } catch {
      return res.status(404).send({ message: '설문조사를 다시 진행해주세요' })
    }
  },
}
