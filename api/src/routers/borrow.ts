import express from 'express'

import {
  findAllBorrows,
  findBorrowById,
  createBorrow,
  // updateBorrow,
  deleteBorrow,
} from '../controllers/borrow'
import verifyAuth from '../middlewares/verifyAuth'
import verifyAdmin from '../middlewares/verifyAdmin'

const router = express.Router()

// Every path we define here will get /api/v1/borrows prefix

router.get('/', findAllBorrows)
router.get('/:borrowId', findBorrowById)
router.post('/', verifyAuth, verifyAdmin, createBorrow)
// router.put('/:borrowId', updateBorrow)
router.delete('/:borrowId', verifyAuth, verifyAdmin, deleteBorrow)

export default router
