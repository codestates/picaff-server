import { Response, Request } from 'express'
import { createQueryBuilder, getRepository } from 'typeorm'
import token from '@middleware/jwt'
import 'dotenv/config'
import Liked from '@entity/Liked.entity'

const addLiked = async (req: Request, res: Response) => {
  if (typeof req.query.itemId === undefined) {
    return res.send(400).send('itemId undefined.')
  } else {
    try {
      if (req.headers.authorization !== undefined) {
        const authorization: string = req.headers.authorization
        const itemId = Number(req.query.itemId)
        const myToken = authorization!.split(' ')[1]
        const data = token.verifyToken(myToken)
        const { id, userName } = data

        const checkItemLiked = await createQueryBuilder()
          .select('liked')
          .from(Liked, 'liked')
          .where('userId = :userId', { userId: id })
          .andWhere('itemId = :itemId', { itemId: itemId })
          .getOne()
        if (checkItemLiked) {
          res.status(400).send('item already exists')
        } else {
          const liked: Liked = new Liked()
          liked.userId = id
          liked.itemId = itemId
          await getRepository(Liked).save(liked)
          res.status(200).send(`${userName}` + ' liked this item.')
        }
      } else {
        res.status(401).send('Invalid access token')
      }
    } catch (err) {
      res.status(403).send('Token expired')
    }
  }
}
export default addLiked
