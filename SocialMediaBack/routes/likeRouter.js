import express from 'express'
import {
  getList,
  getListByPostId, 
  add, 
  remove
} from '../controllers/likeController.js'

const router = express.Router()

router.get('/', getList)
router.get('/getListByPostId', getListByPostId)
router.post('/add', add) 
router.delete('/delete', remove)

export default router