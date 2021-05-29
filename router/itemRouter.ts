import { itemController } from '../controllers/index'
import express from 'express'

const router = express.Router()

router.get('/', itemController.getItem)
router.get('/all', itemController.getAllItems)
router.post('/sharing', itemController.sharing)
router.post('/liked', itemController.addLiked)
router.post('/tag', itemController.getTag)
export default router
