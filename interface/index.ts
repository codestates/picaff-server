import User from '@entity/User.entity'
import Item from '@entity/Item.entity'
import ProductCharacter from '@entity/ProductCharacter.entity'
import CoffeeCharacter from '@entity/CoffeeCharacter.entity'
import TestResult from '@entity/TestResult.entity'
import TagItem from '@entity/TagItem.entity'
import Liked from '@entity/Liked.entity'
import { getRepository, getConnection } from 'typeorm'
import { tokenUser, coffeeItemInfo, productItemInfo } from './type'

export default {
  isCheckedUser: async (target: string) => {
    const userEntity = getRepository(User)
    const userInfo = await userEntity.findOne({ where: { email: target } })
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
      const userEntity = getRepository(User)
      const userInfo = await userEntity.findOne({ where: { id: id } })
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
    const testResultEntity = getRepository(TestResult)
    if (isNull) {
      const testInfo = await testResultEntity.findOne({ where: { id: testId } })
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
          const resultInfo = await testResultEntity.findOne({ where: { id: testId } })
          if (typeof resultInfo !== 'undefined') {
            return [resultInfo]
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
      //로그인중인 상태라면
      const testInfo = await testResultEntity.find({ where: { userId: userId } })
      if (testInfo.length < 1) {
        return testInfo
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

  getGoogleUserInfo: async (target: string) => {
    const userEntity = getRepository(User)
    const userInfo = await userEntity.findOne({ where: { email: target } })
    if (typeof userInfo === 'undefined') {
      return undefined
    } else {
      return userInfo
    }
  },

  getItemInfo: async (itemId: number, userId: number | null) => {
    try {
      const targetItem = await getRepository(Item).findOne({ where: { id: itemId } })
      if (typeof itemId === 'undefined') {
        throw new Error('정확한 정보를 입력해 주세요')
      } else {
        if (targetItem!.type === 'coffee') {
          const itemInfo = await getRepository(Item)
            .createQueryBuilder('item')
            .leftJoinAndSelect('item.coffeeCharacter', 'coffeeCharacter')
            .leftJoinAndSelect('item.tagItems', 'tagItem')
            .leftJoinAndSelect('tagItem.tag', 'tag')
            .where('item.id = :id', { id: itemId })
            .getOne()
          let isCheckLiked: boolean
          if (userId === null) {
            isCheckLiked = false
          } else {
            const CheckIsLiked = await getRepository(Liked)
              .createQueryBuilder('liked')
              .where('liked.userId = :userId', { userId: userId })
              .andWhere('liked.itemId = :itemId', { itemId: itemId })
              .getOne()
            if (typeof CheckIsLiked === 'undefined') {
              isCheckLiked = false
            } else {
              isCheckLiked = true
            }
          }
          if (typeof itemInfo !== 'undefined') {
            const {
              id,
              itemName,
              itemPrice,
              itemDetail,
              type,
              iso,
              productCharacterId,
              coffeeCharacterId,
              coffeeCharacter,
              tagItems,
            } = itemInfo
            const resultItemInfo: coffeeItemInfo = {
              id: id,
              itemName: itemName,
              itemPrice: itemPrice,
              itemDetail: itemDetail,
              type: type,
              iso: iso,
              productCharacterId: productCharacterId,
              coffeeCharacterId: coffeeCharacterId,
              coffeeCharacter: coffeeCharacter,
              tag: tagItems.map((data) => {
                return data.tag
              }),
              isLiked: isCheckLiked,
            }
            return resultItemInfo
          } else {
            throw new Error('정확한 정보를 입력해 주세요')
          }
        } else if (targetItem!.type === 'product') {
          const itemInfo = await getRepository(Item)
            .createQueryBuilder('item')
            .leftJoinAndSelect('item.productCharacter', 'productCharacter')
            .leftJoinAndSelect('item.tagItems', 'tagItem')
            .leftJoinAndSelect('tagItem.tag', 'tag')
            .where('item.id = :id', { id: itemId })
            .getOne()
          let isCheckLiked: boolean
          if (userId === null) {
            isCheckLiked = false
          } else {
            const CheckIsLiked = await getRepository(Liked)
              .createQueryBuilder('liked')
              .where('liked.userId = :userId', { userId: userId })
              .andWhere('liked.itemId = :itemId', { itemId: itemId })
              .getOne()
            if (typeof CheckIsLiked === 'undefined') {
              isCheckLiked = false
            } else {
              isCheckLiked = true
            }
          }
          if (typeof itemInfo !== 'undefined') {
            const {
              id,
              itemName,
              itemPrice,
              itemDetail,
              type,
              iso,
              productCharacterId,
              coffeeCharacterId,
              productCharacter,
              tagItems,
            } = itemInfo
            const resultItemInfo: productItemInfo = {
              id: id,
              itemName: itemName,
              itemPrice: itemPrice,
              itemDetail: itemDetail,
              type: type,
              iso: iso,
              productCharacterId: productCharacterId,
              coffeeCharacterId: coffeeCharacterId,
              productCharacter: productCharacter,
              tag: tagItems.map((data) => {
                return data.tag
              }),
              isLiked: isCheckLiked,
            }
            return resultItemInfo
          } else {
            throw new Error('정확한 정보를 입력해 주세요')
          }
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
        .leftJoinAndSelect('item.tagItems', 'tagItem')
        .leftJoinAndSelect('tagItem.tag', 'tag')
        .getMany()
      const itemList = likedItemList.map((data) => {
        const {
          id,
          itemName,
          itemPrice,
          itemDetail,
          type,
          iso,
          productCharacterId,
          coffeeCharacterId,
          coffeeCharacter,
          tagItems,
        } = data
        let itemInfo: coffeeItemInfo = {
          id: id,
          itemName: itemName,
          itemPrice: itemPrice,
          itemDetail: itemDetail,
          type: type,
          iso: iso,
          productCharacterId: productCharacterId,
          coffeeCharacterId: coffeeCharacterId,
          coffeeCharacter: coffeeCharacter,
          tag: tagItems.map((data) => {
            return data.tag
          }),
          isLiked: true,
        }
        return itemInfo
      })
      return itemList
    } else {
      const likedItemList = await getRepository(Item)
        .createQueryBuilder('item')
        .leftJoin('item.likeds', 'liked')
        .leftJoinAndSelect('item.productCharacter', 'productCharacter')
        .where('item.type = :type', { type: type })
        .andWhere('liked.Userid = :userId', { userId: userId })
        .leftJoinAndSelect('item.tagItems', 'tagItem')
        .leftJoinAndSelect('tagItem.tag', 'tag')
        .getMany()
      const itemList = likedItemList.map((data) => {
        const {
          id,
          itemName,
          itemPrice,
          itemDetail,
          type,
          iso,
          productCharacterId,
          coffeeCharacterId,
          productCharacter,
          tagItems,
        } = data
        let itemInfo: productItemInfo = {
          id: id,
          itemName: itemName,
          itemPrice: itemPrice,
          itemDetail: itemDetail,
          type: type,
          iso: iso,
          productCharacterId: productCharacterId,
          coffeeCharacterId: coffeeCharacterId,
          productCharacter: productCharacter,
          tag: tagItems.map((data) => {
            return data.tag
          }),
          isLiked: true,
        }
        return itemInfo
      })
      return itemList
    }
  },

  createTestInfo: async (userId: number | null, coffeeType: number, itemType: number) => {
    const testResult: TestResult = await new TestResult()
    if (typeof userId === 'number') {
      testResult.userId = userId
      testResult.coffeeTypeId = coffeeType
      testResult.itemTypeId = itemType
      await getRepository(TestResult).save(testResult)
    } else {
      testResult.userId = null
      testResult.coffeeTypeId = coffeeType
      testResult.itemTypeId = itemType
      await getRepository(TestResult).save(testResult)
    }
    return testResult
  },

  getTestResultItem: async (coffeeId: number, productId: number, userId: number) => {
    let coffeeResult: coffeeItemInfo | object
    let productResult: productItemInfo | object
    const coffeeInfo = await getRepository(Item)
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.coffeeCharacter', 'coffeeCharacter')
      .leftJoinAndSelect('item.tagItems', 'tagItem')
      .leftJoinAndSelect('tagItem.tag', 'tag')
      .where('item.id = :id', { id: coffeeId })
      .getOne()
    let isCheckLiked: boolean
    if (userId === null) {
      isCheckLiked = false
    } else {
      const CheckIsLiked = await getRepository(Liked)
        .createQueryBuilder('liked')
        .where('liked.userId = :userId', { userId: userId })
        .andWhere('liked.itemId = :itemId', { itemId: coffeeId })
        .getOne()
      if (typeof CheckIsLiked === 'undefined') {
        isCheckLiked = false
      } else {
        isCheckLiked = true
      }
    }
    if (typeof coffeeInfo !== 'undefined') {
      const {
        id,
        itemName,
        itemPrice,
        itemDetail,
        type,
        iso,
        productCharacterId,
        coffeeCharacterId,
        coffeeCharacter,
        tagItems,
      } = coffeeInfo
      const resultItemInfo: coffeeItemInfo = {
        id: id,
        itemName: itemName,
        itemPrice: itemPrice,
        itemDetail: itemDetail,
        type: type,
        iso: iso,
        productCharacterId: productCharacterId,
        coffeeCharacterId: coffeeCharacterId,
        coffeeCharacter: coffeeCharacter,
        tag: tagItems.map((data) => {
          return data.tag
        }),
        isLiked: isCheckLiked,
      }
      coffeeResult = resultItemInfo
    } else {
      coffeeResult = {}
    }
    const productInfo = await getRepository(Item)
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.productCharacter', 'productCharacter')
      .leftJoinAndSelect('item.tagItems', 'tagItem')
      .leftJoinAndSelect('tagItem.tag', 'tag')
      .where('item.id = :id', { id: productId })
      .getOne()
    if (userId === null) {
      isCheckLiked = false
    } else {
      const CheckIsLiked = await getRepository(Liked)
        .createQueryBuilder('liked')
        .where('liked.userId = :userId', { userId: userId })
        .andWhere('liked.itemId = :itemId', { itemId: productId })
        .getOne()
      if (typeof CheckIsLiked === 'undefined') {
        isCheckLiked = false
      } else {
        isCheckLiked = true
      }
    }
    if (typeof productInfo !== 'undefined') {
      const {
        id,
        itemName,
        itemPrice,
        itemDetail,
        type,
        iso,
        productCharacterId,
        coffeeCharacterId,
        productCharacter,
        tagItems,
      } = productInfo
      const resultItemInfo: productItemInfo = {
        id: id,
        itemName: itemName,
        itemPrice: itemPrice,
        itemDetail: itemDetail,
        type: type,
        iso: iso,
        productCharacterId: productCharacterId,
        coffeeCharacterId: coffeeCharacterId,
        productCharacter: productCharacter,
        tag: tagItems.map((data) => {
          return data.tag
        }),
        isLiked: isCheckLiked,
      }
      productResult = resultItemInfo
    } else {
      productResult = {}
    }

    return { coffeeResult: coffeeResult, productResult: productResult }
  },

  getTagAndItemInfo: async (tagId: number, type: string) => {
    const tagAndItemInfo = await getRepository(TagItem)
      .createQueryBuilder('tagItem')
      .leftJoinAndSelect('tagItem.tag', 'tag')
      .leftJoinAndSelect('tagItem.item', 'item')
      .where('tag.id = :id', { id: tagId })
      .andWhere('item.type = :type', { type: type })
      .getMany()
    return tagAndItemInfo
  },
}
