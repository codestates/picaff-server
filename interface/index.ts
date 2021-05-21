import { getRepository, getConnection } from 'typeorm'
import User from '@entity/User.entity'
import TestResult from '@entity/TestResult.entity'
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
  pickUserInfo: async (target: string) => {
    const allTable = getRepository(User)
    const userInfo = await allTable.findOne({ where: { email: target } })
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
}
