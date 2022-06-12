import express from 'express'
import {
  getList,
  getListByUserId,
  mergePost,
  add,
  update,
  remove
} from '../controllers/postController.js'

const router = express.Router()

router.post('/', getList)
router.post('/mergePost', mergePost)
router.get('/byUserId', getListByUserId)
router.post('/add', add)
router.put('/update', update)
router.delete('/delete', remove)

export default router