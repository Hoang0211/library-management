import express from 'express'

import {
  findAllBorrows,
  createBorrows,
  deleteBorrow,
} from '../controllers/borrow'
import verifyAuth from '../middlewares/verifyAuth'
import verifyAdmin from '../middlewares/verifyAdmin'

const router = express.Router()

// Every path we define here will get /api/v1/borrows prefix

router.get('/', verifyAuth, verifyAdmin, findAllBorrows)
router.post('/', verifyAuth, verifyAdmin, createBorrows)
router.delete('/:borrowId', verifyAuth, verifyAdmin, deleteBorrow)

export default router
