import token from '@middleware/jwt'
import { Response, Request } from 'express'
import { default as interfaces } from '@interface/index'
import { getRepository } from 'typeorm'
import Item from '@entity/Item.entity'

const getAllItems = async (req: Request, res: Response) => {
  try {
    if (!req.query.type) {
      return res.status(404).send({ message: '잘못된 정보가 입력되었습니다.' })
    } else {
      let type: string
      if (req.query.type === 'coffee') type = 'coffee'
      else if (req.query.type === 'product') type = 'product'
      else type = ''
      if (req.headers.authorization) {
        const accessToken = req.headers.authorization.split(' ')[1]
        const verifyToken = token.verifyToken(accessToken)
        const userInfo = await interfaces.getUserInfo(verifyToken.email)
        if (verifyToken.id !== userInfo.id) {
          return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' })
        }
        const itemEntity = await getRepository(Item).find({ where: { type: type } })
        if (!itemEntity) return res.status(403).send({ message: '정확한 정보를 입력해주세요.' })
        const itemsInfo = await Promise.all(
          itemEntity.map((data) => {
            const itemInfo = interfaces.getItemInfo(data.id, verifyToken.id)
            return itemInfo
          })
        )
        return res.status(200).send(itemsInfo)
      } else {
        const itemEntity = await getRepository(Item).find({ where: { type: type } })
        if (!itemEntity) return res.status(403).send({ message: '정확한 정보를 입력해주세요.' })
        const itemsInfo = await Promise.all(
          itemEntity.map((data) => {
            const itemInfo = interfaces.getItemInfo(data.id, null)
            return itemInfo
          })
        )
        return res.status(200).send(itemsInfo)
      }
    }
  } catch (err) {
    return res.status(403).send({ message: '정확한 정보를 입력해 주세요.' })
  }
}

export default getAllItems
