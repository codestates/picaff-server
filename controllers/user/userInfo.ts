import token from '@middleware/jwt'
import { Response, Request } from 'express'
import { default as interfaces } from '@interface/index'
import { coffeeItemInfo, productItemInfo } from '@interface/type'

const userInfo = async (req: Request, res: Response) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' })
  } else {
    const accessToken = req.headers.authorization.split(' ')[1]
    try {
      const verifyToken = token.verifyToken(accessToken)
      const userInfo = await interfaces.getUserInfo(verifyToken.email)
      const testInfo = await interfaces.getTestResultInfo(verifyToken.id, verifyToken, null, false)
      const likedCoffeeList = await interfaces.getLiked(verifyToken.id, 'coffee')
      const likedProductList = await interfaces.getLiked(verifyToken.id, 'machine')
      if (typeof testInfo !== 'string') {
        const coffeeInfo = await interfaces.getItemInfo(testInfo.coffeeTypeId, userInfo.id)
        const productInfo = await interfaces.getItemInfo(testInfo.itemTypeId, userInfo.id)
        if (typeof coffeeInfo === 'undefined' || typeof productInfo === 'undefined') {
          return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' })
        }
        return res
          .status(200)
          .send({
            userInfo: userInfo,
            testResultcoffee: coffeeInfo,
            testResultProduct: productInfo,
            likedCoffeeList: likedCoffeeList,
            likedProductList: likedProductList,
          })
      } else {
        return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' })
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

export default userInfo
