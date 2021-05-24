import { itemController } from '../controllers/index'
import express from 'express'

const router = express.Router()

router.get('/product', itemController.getProduct)
router.post('/coffee', itemController.getCoffee)
router.post('/sharing', itemController.sharing)
router.post('/liked', itemController.addLiked)
router.post('/tag', itemController.getTag)
export default router
