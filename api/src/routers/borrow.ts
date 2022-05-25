import express from 'express'

import {
  findAllBorrows,
  findBorrowById,
  createBorrow,
  updateBorrow,
  deleteBorrow,
} from '../controllers/borrow'

const router = express.Router()

// Every path we define here will get /api/v1/borrows prefix

router.get('/', findAllBorrows)
router.get('/:borrowId', findBorrowById)
router.post('/', createBorrow)
router.put('/:borrowId', updateBorrow)
router.delete('/:borrowId', deleteBorrow)

export default router
