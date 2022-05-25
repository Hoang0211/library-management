import express from 'express'

import {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix

router.get('/', findAllUsers)
router.get('/:userId', findUserById)
router.post('/', createUser)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

export default router
