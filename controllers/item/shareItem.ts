import Shared from '@entity/Shared.entity'
import { Response, Request } from 'express'
import { getConnection, getRepository } from 'typeorm'

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
      let sharedInfo = await getRepository(Shared).findOne({ where: { id: 1 } })
      console.log(sharedInfo!.count)
      if (sharedInfo === undefined) {
        return res.status(404).send({ message: '정확한 정보를 입력해주세요.' })
      } else {
        return res.status(200).send({ count: sharedInfo.count })
      }
    } catch (err) {
      return res.status(404).send({ message: '문제가 발생했습니다.' })
    }
  } else {
    return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' })
  }
}

export default shareItem
