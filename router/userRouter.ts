import express from 'express'
import { userController } from '../controllers/index'
const router = express.Router()

router.post('/signup', userController.signUp)
router.post('/email', userController.mail)
router.post('/google', userController.googleOauth)
router.post('/kakao', userController.kakaoOauth)
router.post('/signin', userController.signIn)
router.post('/signout', userController.signOut)
router.delete('/', userController.signOff)
router.patch('/', userController.modification)
router.patch('/test', userController.addTest)
router.get('/', userController.userInfo)
router.post('/email', userController.mail)
router.post('/token', userController.getAccessToken)

export default router
