import { itemController } from '../controllers/index'
import express from 'express'

const router = express.Router()

router.get('/', itemController.getItem)
router.get('/all', itemController.getAllItems)
router.post('/sharing', itemController.sharing)
router.post('/liked', itemController.addLiked)
router.get('/tag', itemController.getTag)
<<<<<<< HEAD
router.post('/price', itemController.priceComparison)
=======
router.post('/crawling', itemController.crawling)

>>>>>>> 498394a18267d5ffddf196fc433c856a808b47bc
export default router
