import { Response, Request } from 'express'
import { getRepository, getConnection } from 'typeorm'
import token from '@middleware/jwt'
import 'dotenv/config'
import Liked from '@entity/Liked.entity'

const addLiked = async (req: Request, res: Response) => {
  if (!req.body.itemId) {
    return res.send(404).send({ message: '정확한 정보를 입력해 주세요.' })
  } else {
    try {
      if (req.headers.authorization !== undefined) {
        if (req.headers.authorization) {
          const authorization: string = req.headers.authorization
          const itemId = req.body.itemId
          const accessToken = authorization!.split(' ')[1]
          const data = token.verifyToken(accessToken)
          const { id } = data
          const checkItemLiked = await getRepository(Liked)
            .createQueryBuilder('liked')
            .where('liked.userId = :userId', { userId: id })
            .andWhere('liked.itemId = :itemId', { itemId: itemId })
            .getOne()

          if (checkItemLiked) {
            await getConnection()
              .createQueryBuilder()
              .delete()
              .from(Liked)
              .where({ userId: id })
              .execute()
            return res.status(202).send()
          } else {
            const liked: Liked = new Liked()
            liked.userId = id
            liked.itemId = itemId
            await getRepository(Liked).save(liked)

            return res.status(200).send(liked)
          }
        } else {
          return res.status(401).send('로그인상태와 엑세스토큰 확인이 필요합니다.')
        }
      } else {
        return res.status(401).send('로그인상태와 엑세스토큰 확인이 필요합니다.')
      }
    } catch (err) {
      return res.status(401).send('로그인상태와 엑세스토큰 확인이 필요합니다.')
    }
  }
}
export default addLiked
