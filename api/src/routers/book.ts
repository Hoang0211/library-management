import express from 'express'

import {
  findAllBooks,
  findBookById,
  createBook,
  updateBook,
  deleteBook,
  createInitialData,
} from '../controllers/book'

const router = express.Router()

// Every path we define here will get /api/v1/books prefix

router.get('/', findAllBooks)
router.get('/:bookId', findBookById)
router.post('/initial', createInitialData)
router.post('/', createBook)
router.put('/:bookId', updateBook)
router.delete('/:bookId', deleteBook)

export default router
