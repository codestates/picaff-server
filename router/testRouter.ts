import express from 'express'
const router = express.Router()
import testController from '../controllers/testController'

export default router
router.post('/', testController.post)