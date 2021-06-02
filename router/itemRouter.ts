import { itemController } from '../controllers/index'
import express from 'express'

const router = express.Router()

router.get('/', itemController.getItem)
router.get('/all', itemController.getAllItems)
router.post('/sharing', itemController.sharing)
router.post('/liked', itemController.addLiked)
router.get('/tag', itemController.getTag)
router.post('/price', itemController.priceComparison)
export default router
