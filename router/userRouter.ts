import express from "express";
import { userController } from '../controllers/index';
const router = express.Router();

router.post('/signup', userController.signup);
// router.post('/google', userController.google);
// router.post('/kakao', userController.kakao);
router.post('/signin', userController.signin);
router.post('/signout', userController.signout);
// router.delete('/', userController.signoff);
// router.patch('/', userController.modification);
// router.patch('/test', userController.addtest);
// router.get('/', userController.userinfo);
router.post("/email", userController.mail);

export default router;