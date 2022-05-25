import express from 'express'

import {
  findAllAuthors,
  findAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from '../controllers/author'

const router = express.Router()

// Every path we define here will get /api/v1/authors prefix

router.get('/', findAllAuthors)
router.get('/:authorId', findAuthorById)
router.post('/', createAuthor)
router.put('/:authorId', updateAuthor)
router.delete('/:authorId', deleteAuthor)

export default router
