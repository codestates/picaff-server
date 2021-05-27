import { getRepository, getConnection } from 'typeorm'
import User from '@entity/User.entity'
import Item from '@entity/Item.entity'
import ProductCharacter from '@entity/ProductCharacter.entity'
import CoffeeCharacter from '@entity/CoffeeCharacter.entity'
import TestResult from '@entity/TestResult.entity'
import { tokenUser } from './type'
import TagItem from '@entity/TagItem.entity'

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
  pickTestResultInfo: async (target: number, token: tokenUser, testId: number) => {
    const allTable = getRepository(TestResult)
    const testInfo = await allTable.findOne({ where: { id: testId } })
    if (typeof testInfo === 'undefined') {
      const err: string = '회원 정보와 설문조사 자료가 일치하지 않습니다.'
      return err
    } else {
      if (testInfo.userId === null) {
        await getConnection()
          .createQueryBuilder()
          .update(TestResult)
          .set({ userId: target })
          .where({ id: testId })
          .execute()
        return {
          testResult: {
            id: testInfo.id,
            userId: token.id,
            itemTypeId: testInfo.itemTypeId,
            coffeeTypeId: testInfo.coffeeTypeId,
          },
        }
      } else {
        const err: string = '회원 정보와 설문조사 자료가 일치하지 않습니다.'
        return err
      }
    }
  },

  createUser: async (email: string, userName: string, password: string) => {
    const user: User = new User()
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

  getGoogleUserInfo: async (target: string) => {
    const userEntity = getRepository(User)
    const userInfo = await userEntity.findOne({ where: { email: target } })
    if (typeof userInfo === 'undefined') {
      return undefined
    } else {
      return userInfo
    }
  },

  getItemInfoWithLiked: async (itemId: number) => {
    const itemInfo = await getRepository(Item)
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.likeds', 'liked', 'liked.itemId = :itemId', { itemId: itemId })
      .leftJoinAndSelect('item.tagItems', 'tagItem', 'tagItem.itemId = :itemId', {
        itemId: itemId,
      })
      .getOne()
    console.log(itemInfo)
    return itemInfo
  },

  getTagAndItemInfo: async (tagId: number, type: string) => {
    const tagAndItemInfo = await getRepository(TagItem)
      .createQueryBuilder('tagItem')
      .leftJoinAndSelect('tagItem.tag', 'tag')
      .leftJoinAndSelect('tagItem.item', 'item')
      .where('tag.id = :id', { id: tagId })
      .andWhere('item.type = :type', { type: type })
      .getMany()

    console.log(tagAndItemInfo)
    return tagAndItemInfo
  },

  // 되는코드
  // const tagInfo = await getRepository(TagItem)
  // .createQueryBuilder('tagItem')
  // .leftJoinAndSelect('tagItem.tag', 'tag')
  // .where('tag.id = :id', { id: tagId })
  // .leftJoinAndSelect('item.type', 'type')
  // .andWhere('item.type = :type', { type: type })
  // .getMany()

  getCoffeeCharacter: async (coffeeCharacterId: number) => {
    const coffeeCharacter = await getRepository(CoffeeCharacter).findOne({
      where: { id: coffeeCharacterId },
    })
    return coffeeCharacter
  },

  getProductCharacter: async (productCharacterId: number) => {
    const productCharacter = await getRepository(ProductCharacter).findOne({
      where: { id: productCharacterId },
    })
    return productCharacter
  },

  getAllItemInfo: async (target: string) => {
    const allItemInfo = await getRepository(Item).find({ where: { type: target } })
    console.log(allItemInfo)
    return allItemInfo
  },
}
