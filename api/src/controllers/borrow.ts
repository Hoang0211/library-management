import { Request, Response, NextFunction } from 'express'

import UserService from '../services/User'
import BookService from '../services/Book'
import Borrow, { BorrowDocument } from '../models/Borrow'
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
    const { userEmail, bookIds, borrowDate, dueDate } = req.body

    // Validate and get user by email
    const foundUser = await UserService.findOneForBorrow(userEmail)
    let userId = ''
    if (foundUser !== null) {
      userId = foundUser._id
    }

    // Borrow function
    const borrowBook = async (
      userId: string,
      bookId: string,
      borrowDate: Date,
      dueDate: Date
    ) => {
      const borrow = new Borrow({
        user: userId,
        book: bookId,
        borrowDate,
        dueDate,
      })
      await BorrowService.create(borrow)
    }

    // Validate, change status for each book and create borrow instance
    bookIds.forEach((bookId: string) => {
      BookService.borrow(bookId)
      borrowBook(userId, bookId, borrowDate, dueDate)
    })

    res.status(204).end()
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
