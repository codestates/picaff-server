import Tag from '@entity/Tag.entity'
import TagItem from '@entity/TagItem.entity'
import Item from '@entity/Item.entity'
import { default as interfaces } from '@interface/index'
import { default as token } from '@middleware/jwt'
import { Response, Request } from 'express'
import { createQueryBuilder, getRepository } from 'typeorm'

const getTag = async (req: Request, res: Response) => {
  const authorization = String(req.headers.authorization)
  if (authorization) {
    try {
      const itemType = String(req.query.itemType)
      const tagId = Number(req.query.tagId)
      const tagAndItemInfo = await interfaces.getTagAndItemInfo(tagId, itemType)
      console.log(tagAndItemInfo!)

      const refined = tagAndItemInfo.map((el) => {
        return {
          id: el.item.id,
          itemName: el.item.itemName,
          type: el.item.type,
        }
      })
      console.log(refined)

      res.status(200).send({
        tagId: tagAndItemInfo[0].tagId,
        tagName: tagAndItemInfo[0].tag.tagName,
        tagItemList: refined,
      })
    } catch (err) {
      res.send(400).send('error')
    }
  } else {
    res.send(401).send('Invalid token.')
  }
}

export default getTag
