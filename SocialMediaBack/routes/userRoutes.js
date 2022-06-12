import express from 'express'
import {
  getList,
  add,
  update,
  remove
} from '../controllers/userController.js'

const router = express.Router()

router.get('/', getList)
router.post('/add', add)
router.put('/update', update)
router.delete('/delete', remove)

export default router