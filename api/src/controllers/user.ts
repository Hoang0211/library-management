import { Request, Response, NextFunction } from 'express'

import User, { UserDocument } from '../models/User'
import UserService from '../services/User'
import { BadRequestError } from '../helpers/apiError'

// GET /users/:userId
export const findUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findUserById(req.params.userId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /users/:userId
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const userId = req.params.userId
    const user = req.user as UserDocument

    const updatedUser = await UserService.updateUser(
      userId,
      user?.email,
      update
    )
    res.json(updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
