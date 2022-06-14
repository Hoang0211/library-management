import express from 'express'

import { findUserById, updateUser } from '../controllers/user'
import verifyAuth from '../middlewares/verifyAuth'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix

router.get('/:userId', findUserById)
router.put('/:userId', verifyAuth, updateUser)

export default router
