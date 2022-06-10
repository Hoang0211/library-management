import { Request, Response, NextFunction } from 'express'

import UserService from '../services/User'
import BookService from '../services/Book'
import Borrow from '../models/Borrow'
import BorrowService from '../services/Borrow'
import { BadRequestError } from '../helpers/apiError'

// GET /borrows
export const findAllBorrows = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BorrowService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /borrows/:borrowId
export const findBorrowById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BorrowService.findById(req.params.borrowId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// POST /borrows
export const createBorrow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userEmail, bookIds, loanDate, dueDate } = req.body

    // Validate and get user by email
    const user = await UserService.findOneForBorrow(userEmail)
    let userId = ''
    if (user !== null) {
      userId = user._id
    }

    // Validate and change status for each book
    bookIds.forEach((bookId: string) => BookService.loan(bookId))

    // Create borrow
    const borrow = new Borrow({
      userId,
      bookIds,
      loanDate,
      dueDate,
    })
    await BorrowService.create(borrow)
    res.json(borrow)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /borrows/:borrowId
// export const updateBorrow = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const update = req.body
//     const borrowId = req.params.borrowId
//     const updatedBorrow = await BorrowService.update(borrowId, update)
//     res.json(updatedBorrow)
//   } catch (error) {
//     if (error instanceof Error && error.name == 'ValidationError') {
//       next(new BadRequestError('Invalid Request', error))
//     } else {
//       next(error)
//     }
//   }
// }

// DELETE /borrows/:borrowId
export const deleteBorrow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await BorrowService.deleteBorrow(req.params.borrowId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
