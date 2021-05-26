import { getRepository, getConnection } from 'typeorm'
import User from '@entity/User.entity'
import TestResult from '@entity/TestResult.entity'
import Item from '@entity/Item.entity'
import { tokenUser } from './type'

export default {
  isCheckUser: async (target: string) => {
    const allTable = getRepository(User)
    const userInfo = await allTable.findOne({ where: { email: target } })
    if (typeof userInfo === 'undefined') {
      return false
    } else {
      return true
    }
  },
  getUserInfo: async (target: string) => {
    const userEntity = getRepository(User)
    const userInfo = await userEntity.findOne({ where: { email: target } })
    if (typeof userInfo === 'undefined') {
      throw new Error('잘못된 회원 정보입니다.')
    } else {
      return userInfo
    }
  },
  editUserInfo: async (target: string, editInfo: string, id: number) => {
    try {
      if (target === 'userName') {
        await getConnection()
          .createQueryBuilder()
          .update(User)
          .set({ userName: editInfo })
          .where({ id: id })
          .execute()
      } else if (target === 'password') {
        await getConnection()
          .createQueryBuilder()
          .update(User)
          .set({ password: editInfo })
          .where({ id: id })
          .execute()
      }
      const allTable = getRepository(User)
      const userInfo = await allTable.findOne({ where: { id: id } })
      if (typeof userInfo === 'undefined') {
        throw Error('잘못된 회원 정보입니다.')
      } else {
        return userInfo
      }
    } catch (err) {
      throw new Error('다시 시도하세요.')
    }
  },
  getTestResultInfo: async (
    userId: number,
    token: tokenUser,
    testId: number | null,
    isNull: boolean
  ) => {
    const estResultEntity = getRepository(TestResult)
    if (isNull) {
      const testInfo = await estResultEntity.findOne({ where: { id: testId } })
      if (typeof testInfo === 'undefined') {
        const err: string = '회원 정보와 설문조사 자료가 일치하지 않습니다.'
        return err
      } else {
        if (testInfo.userId === null) {
          await getConnection()
            .createQueryBuilder()
            .update(TestResult)
            .set({ userId: userId })
            .where({ id: testId })
            .execute()
          const resultInfo = await estResultEntity.findOne({ where: { id: testId } })
          if (typeof resultInfo !== 'undefined') {
            return resultInfo
          } else {
            const err: string = '회원 정보와 설문조사 자료가 일치하지 않습니다.'
            return err
          }
        } else {
          const err: string = '회원 정보와 설문조사 자료가 일치하지 않습니다.'
          return err
        }
      }
    } else {
      const testInfo = await estResultEntity.findOne({ where: { userId: userId } })
      if (typeof testInfo === 'undefined') {
        throw new Error('회원 정보와 설문조사 자료가 일치하지 않습니다.')
      } else {
        return testInfo
      }
    }
  },
  createUser: async (email: string, userName: string, password: string) => {
    const user: User = await new User()
    user.email = email
    user.userName = userName
    user.password = password
    await getRepository(User).save(user)
    return user
  },
  createOauthUser: async (email: number, userName: string, password: string) => {
    const user: User = new User()
    const changeEmailType = `'${email}'`
    user.email = changeEmailType
    user.userName = userName
    user.password = password
    await getRepository(User).save(user)
    return user
  },
  getKakaoUserInfo: async (target: string) => {
    const userEntity = getRepository(User)
    const userInfo = await userEntity.findOne({ where: { email: target } })
    if (typeof userInfo === 'undefined') {
      return undefined
    } else {
      return userInfo
    }
  },
  getProduct: async () => {
    await getConnection().createQueryBuilder()
  },
  getItemInfo: async (itemId: number) => {
    try {
      const itemEntity = await getRepository(Item).findOne({ where: { id: itemId } })
      if (typeof itemId === 'undefined') {
        throw new Error('정확한 정보를 입력해 주세요')
      } else {
        if (itemEntity!.type === 'coffee') {
          const itemInfo = await getRepository(Item)
            .createQueryBuilder('item')
            .leftJoinAndSelect('item.coffeeCharacter', 'coffeeCharacter')
            .where('item.id = :id', { id: itemId })
            .getOne()
          return itemInfo
        } else if (itemEntity!.type === 'machine') {
          const itemInfo = await getRepository(Item)
            .createQueryBuilder('item')
            .leftJoinAndSelect('item.productCharacter', 'productCharacter')
            .where('item.id = :id', { id: itemId })
            .getOne()
          return itemInfo
        }
      }
    } catch {
      throw new Error('정확한 정보를 입력해 주세요')
    }
  },
  getLiked: async (userId: number, type: string) => {
    if (type === 'coffee') {
      const likedItemList = await getRepository(Item)
        .createQueryBuilder('item')
        .leftJoin('item.likeds', 'liked')
        .where('item.type = :type', { type: type })
        .andWhere('liked.Userid = :userId', { userId: userId })
        .leftJoinAndSelect('item.coffeeCharacter', 'coffeeCharacter')
        .getMany()
      return likedItemList
    } else {
      const likedItemList = await getRepository(Item)
        .createQueryBuilder('item')
        .leftJoin('item.likeds', 'liked')
        .leftJoinAndSelect('item.productCharacter', 'productCharacter')
        .where('item.type = :type', { type: type })
        .andWhere('liked.Userid = :userId', { userId: userId })
        .getMany()
      return likedItemList
    }
  },
}
