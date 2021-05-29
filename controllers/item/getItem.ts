import { Response, Request } from 'express'
import { default as interfaces } from '@interface/index'
import { default as token } from '@middleware/jwt'

const getItem = async (req: Request, res: Response) => {
  if (!req.query.itemId) {
    return res.status(404).send('잘못된 정보가 입력되었습니다.')
  } else {
    if (req.headers.authorization) {
      const authorization = String(req.headers.authorization)
      const itemId = Number(req.query.itemId)
      const accessToken = authorization!.split(' ')[1]
      const data = token.verifyToken(accessToken)
      const userId = data.id
      const itemInfo = await interfaces.getItemInfo(itemId, userId)
      return res.status(200).send(itemInfo)
    } else {
      const itemId = Number(req.query.itemId)
      const itemInfo = await interfaces.getItemInfo(itemId, null)
      return res.status(200).send(itemInfo)
    }
  }
}

export default getItem
