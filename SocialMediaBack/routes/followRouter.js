import express from 'express'
import { 
  add,
  remove,
  getListWhoFollowing,
  getListWhoFollower
} from '../controllers/followController.js'


const router = express.Router()

router.get('/getListWhoFollowing', getListWhoFollowing) 
router.get('/getListWhoFollower', getListWhoFollower) 
router.post('/add', add) 
router.delete('/delete', remove)

export default router