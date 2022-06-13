import express from 'express'

import {
  findAllBooks,
  searchAllBooks,
  findBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/book'
import verifyAuth from '../middlewares/verifyAuth'
import verifyAdmin from '../middlewares/verifyAdmin'

const router = express.Router()

// Every path we define here will get /api/v1/books prefix

router.get('/', findAllBooks)
router.get('/search', searchAllBooks)
router.get('/:bookId', findBookById)
router.post('/', verifyAuth, verifyAdmin, createBook)
router.put('/:bookId', verifyAuth, verifyAdmin, updateBook)
router.delete('/:bookId', verifyAuth, verifyAdmin, deleteBook)

export default router
