import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../util/secrets'
import { User } from '../models/User'

const router = express.Router()

// Every path we define here will get /google-login prefix

router.post(
  '/',
  passport.authenticate('google-id-token', { session: false }),
  (req, res) => {
    const user = req.user as User

    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: '1h',
    })
    res.json({ token, user })
  }
)

export default router
