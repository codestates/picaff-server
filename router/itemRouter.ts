import { itemController } from '../controllers/index'
import express from 'express'

const router = express.Router()

router.get('/item', itemController.getItem)
router.get('/item/all', itemController.getAllItems)
router.post('/sharing', itemController.sharing)
router.post('/liked', itemController.addLiked)
router.post('/tag', itemController.getTag)
export default router
