import { Response, Request } from 'express'
import { default as interfaces } from '@interface/index'

const getAllItems = async (req: Request, res: Response) => {
  console.log(req.query)

  if (req.query.type !== undefined) {
    const itemType = String(req.query.type)

    const allItemInfos = interfaces.getAllItemInfo(itemType)
    res.send(allItemInfos)
  }
}

export default getAllItems
