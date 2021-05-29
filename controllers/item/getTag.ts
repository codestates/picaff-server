import { default as interfaces } from '@interface/index'
import { Response, Request } from 'express'

const getTag = async (req: Request, res: Response) => {
  const authorization = String(req.headers.authorization)
  if (authorization) {
    try {
      const itemType = String(req.query.itemType)
      const tagId = Number(req.query.tagId)
      const tagAndItemInfo = await interfaces.getTagAndItemInfo(tagId, itemType)

      const refined = tagAndItemInfo.map((el) => {
        return {
          id: el.item.id,
          itemName: el.item.itemName,
          type: el.item.type,
        }
      })
      return res.status(200).send({
        tagId: tagAndItemInfo[0].tagId,
        tagName: tagAndItemInfo[0].tag.tagName,
        tagItemList: refined,
      })
    } catch (err) {
      return res.send(404).send('잘못된 정보가 입력되었습니다.')
    }
  } else {
    return res.send(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' })
  }
}

export default getTag
