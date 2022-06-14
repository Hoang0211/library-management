import { Request, Response, NextFunction } from 'express'

import BorrowService from '../services/Borrow'
import { BadRequestError } from '../helpers/apiError'

// GET /borrows
export const findAllBorrows = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BorrowService.findAllBorrows())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// POST /borrows
export const createBorrows = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userEmail, bookIds, borrowDate, dueDate } = req.body
    await BorrowService.borrowBooks(userEmail, bookIds, borrowDate, dueDate)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /borrows/:borrowId
export const deleteBorrow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await BorrowService.returnBook(req.params.borrowId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
