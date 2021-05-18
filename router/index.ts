import express from "express";
const router = express.Router();

router.use('/user', require('./userRouter'));
router.use('/item', require('./itemRouter'));
router.use('/test', require('./testRouter'));

export default router;