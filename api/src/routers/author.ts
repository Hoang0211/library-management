import express from 'express'

import {
  findAllAuthors,
  findAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from '../controllers/author'
import verifyAuth from '../middlewares/verifyAuth'
import verifyAdmin from '../middlewares/verifyAdmin'

const router = express.Router()

// Every path we define here will get /api/v1/authors prefix

router.get('/', findAllAuthors)
router.get('/:authorId', findAuthorById)
router.post('/', verifyAuth, verifyAdmin, createAuthor)
router.put('/:authorId', verifyAuth, verifyAdmin, updateAuthor)
router.delete('/:authorId', verifyAuth, verifyAdmin, deleteAuthor)

export default router
