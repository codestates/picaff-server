import { Response, Request } from 'express'
import { default as interfaces } from '@interface/index'
import { default as token } from '@middleware/jwt'

const getAllItems = async (req: Request, res: Response) => {
  try {
    if (!req.query.type) {
      return res.status(404).send('정확한 정보를 입력해 주세요')
    } else {
      if (req.headers.authorization) {
        const authorization = String(req.headers.authorization)
        console.log(authorization)
        const accessToken = authorization!.split(' ')[1]
        const data = token.verifyToken(accessToken)
        const userId = data.id
        const type = String(req.query.type)
        const allItemInfo = await interfaces.getAllItemInfo(userId, type)
        if (type === 'coffee') {
          return res.status(200).send({ allCoffeeItemInfo: allItemInfo }) // 이렇게 할지 or allItemInfo 그대로 넣을지 의견 묻기.
        } else if (type === 'product') {
          return res.status(200).send({ allProductItemInfo: allItemInfo })
        }
      } else {
        const type = String(req.query.type)
        const allItemInfo = await interfaces.getAllItemInfo(null, type)
        if (type === 'coffee') {
          return res.status(200).send({ allCoffeeItemInfo: allItemInfo })
        } else if (type === 'product') {
          return res.status(200).send({ allProductItemInfo: allItemInfo })
        }
      }
    }
  } catch (err) {
    return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' })
  }
}

export default getAllItems
