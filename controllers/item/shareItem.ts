import Shared from '@entity/Shared.entity'
import { Response, Request } from 'express'
import { getConnection } from 'typeorm'

const shareItem = async (req: Request, res: Response) => {
  const { authorization } = req.headers

  if (typeof authorization !== undefined) {
    try {
      await getConnection()
        .createQueryBuilder()
        .update(Shared)
        .set({ count: () => 'count + 1' })
        .where('id = :id', { id: 1 })
        .execute()
      return res.status(200).send('added count')
    } catch (err) {
      return res.status(403).send('Token expired')
    }
  } else {
    return res.status(401).send('Invalid access token.')
  }
}

export default shareItem
