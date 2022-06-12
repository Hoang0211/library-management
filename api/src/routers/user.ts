import express from 'express'

import { findUserById, updateUser, deleteUser } from '../controllers/user'
import verifyAuth from '../middlewares/verifyAuth'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix

router.get('/:userId', findUserById)
router.put('/:userId', verifyAuth, updateUser)
router.delete('/:userId', deleteUser)

export default router
