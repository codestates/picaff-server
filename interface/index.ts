import { getRepository, getConnection } from 'typeorm'
import User from '@entity/User.entity'
import Liked from '@entity/Liked.entity'
import Item from '@entity/Item.entity'
import TagItem from '@entity/TagItem.entity'
import TestResult from '@entity/TestResult.entity'
import { tokenUser, coffeeItemInfo, productItemInfo } from './type'
import { isObject } from 'util'

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
      const testInfo = await testResultEntity.findOne({ where: { userId: userId } })
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
          let isLiked: boolean
          if (userId === null) {
            isLiked = false
          } else {
            const checkIsLiked = await getRepository(Liked)
              .createQueryBuilder('liked')
              .where('liked.userId = :userId', { userId: userId })
              .andWhere('liked.itemId = :itemId', { itemId: itemId })
              .getOne()
            if (typeof checkIsLiked === 'undefined') {
              isLiked = false
            } else {
              isLiked = true
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
              isLiked: isLiked,
            }
            return resultItemInfo
          } else {
            throw new Error('정확한 정보를 입력해 주세요')
          }
        } else if (targetItem!.type === 'machine') {
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
            const checkIsLiked = await getRepository(Liked)
              .createQueryBuilder('liked')
              .where('liked.userId = :userId', { userId: userId })
              .andWhere('liked.itemId = :itemId', { itemId: itemId })
              .getOne()
            if (typeof checkIsLiked === 'undefined') {
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
          iso: iso,
          type: type,
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

  getAllItemInfo: async (userId: number | null, type: string) => {
    try {
      if (userId !== undefined) {
        if (type === 'coffee') {
          const allItemInfoWithUserId = await getRepository(Item)
            .createQueryBuilder('item')
            .where('item.type = :type', { type: 'coffee' })
            .leftJoinAndSelect('item.likeds', 'liked')
            .leftJoinAndSelect('item.coffeeCharacter', 'coffeeCharacter')
            .leftJoinAndSelect('item.tagItems', 'tagItem')
            .leftJoinAndSelect('tagItem.tag', 'tag')
            .getMany()

          const coffeeItemList = await allItemInfoWithUserId.map((data) => {
            const {
              id,
              itemName,
              itemPrice,
              itemDetail,
              type,
              iso,
              likeds,
              productCharacterId,
              coffeeCharacterId,
              coffeeCharacter,
              tagItems,
            } = data

            let like = false
            likeds.filter((el) => {
              if (el.userId === userId && el.itemId === id) {
                return (like = true)
              }
            })

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
              isLiked: like,
            }
            return itemInfo
          })
          return coffeeItemList
        } else if (type === 'product') {
          const allItemInfoWithUserId = await getRepository(Item)
            .createQueryBuilder('item')
            .where('item.type = :type', { type: 'product' })
            .leftJoinAndSelect('item.likeds', 'liked')
            .leftJoinAndSelect('item.productCharacter', 'productCharacter')
            .leftJoinAndSelect('item.tagItems', 'tagItem')
            .leftJoinAndSelect('tagItem.tag', 'tag')
            .getMany()
          const productItemList = await allItemInfoWithUserId.map((data) => {
            const {
              id,
              itemName,
              itemPrice,
              itemDetail,
              type,
              likeds,
              coffeeCharacterId,
              productCharacterId,
              productCharacter,
              tagItems,
            } = data

            let like = false
            likeds.filter((el) => {
              if (el.userId === userId && el.itemId === id) {
                return (like = true)
              }
            })
            let itemInfo: productItemInfo = {
              id: id,
              itemName: itemName,
              itemPrice: itemPrice,
              itemDetail: itemDetail,
              type: type,
              iso: '',
              coffeeCharacterId: coffeeCharacterId,
              productCharacterId: productCharacterId,
              productCharacter: productCharacter,
              tag: tagItems.map((data) => {
                return data.tag
              }),
              isLiked: like,
            }
            return itemInfo
          })
          return productItemList
        }
      } else {
        if (type === 'coffee') {
          const allItemInfoWithoutUserId = await getRepository(Item)
            .createQueryBuilder('item')
            .where('item.type = :type', { type: type })
            .leftJoinAndSelect('item.coffeeCharacter', 'coffeeCharacter')
            .leftJoinAndSelect('item.tagItems', 'tagItem')
            .leftJoinAndSelect('tagItem.tag', 'tag')
            .getMany()
          const coffeeItemList = await allItemInfoWithoutUserId.map((data) => {
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
              isLiked: false,
            }
            return itemInfo
          })
          return coffeeItemList
        } else if (type === 'product') {
          const allItemInfoWithUserId = await getRepository(Item)
            .createQueryBuilder('item')
            .where('item.type = :type', { type: 'product' })
            .leftJoinAndSelect('item.likeds', 'liked')
            .leftJoinAndSelect('item.productCharacter', 'productCharacter')
            .leftJoinAndSelect('item.tagItems', 'tagItem')
            .leftJoinAndSelect('tagItem.tag', 'tag')
            .getMany()
          const productItemList = await allItemInfoWithUserId.map((data) => {
            const {
              id,
              itemName,
              itemPrice,
              itemDetail,
              type,
              coffeeCharacterId,
              productCharacterId,
              productCharacter,
              tagItems,
            } = data
            let itemInfo: productItemInfo = {
              id: id,
              itemName: itemName,
              itemPrice: itemPrice,
              itemDetail: itemDetail,
              type: type,
              iso: '',
              coffeeCharacterId: coffeeCharacterId,
              productCharacterId: productCharacterId,
              productCharacter: productCharacter,
              tag: tagItems.map((data) => {
                return data.tag
              }),
              isLiked: false,
            }
            return itemInfo
          })
          return productItemList
        }
      }
    } catch {
      throw new Error('정확한 정보를 입력해 주세요')
    }
  },
}
