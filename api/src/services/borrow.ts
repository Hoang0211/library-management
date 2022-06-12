import { Status } from '../models/Book'
import User from '../models/User'
import Book from '../models/Book'
import Borrow, { BorrowDocument } from '../models/Borrow'
import { NotFoundError } from '../helpers/apiError'

const findAll = async (): Promise<BorrowDocument[]> => {
  return Borrow.find().sort({ returnDate: 1 }).populate('user').populate('book')
}

const create = async (borrow: BorrowDocument): Promise<BorrowDocument> => {
  return borrow.save()
}

const borrowBooks = async (
  userEmail: string,
  bookIds: string[],
  borrowDate: Date,
  dueDate: Date
): Promise<BorrowDocument[]> => {
  // Verify user existed
  const foundUser = await User.findOne({ email: userEmail })
  if (!foundUser) {
    throw new NotFoundError(`Email ${userEmail} not found`)
  }

  // Verify book existed and create new borrow
  const borrow = Promise.all(
    bookIds.map(async (bookId: string) => {
      const foundBook = await Book.findByIdAndUpdate(
        bookId,
        { status: Status.Borrowed },
        {
          new: true,
          runValidators: true,
        }
      )
      if (!foundBook) {
        throw new NotFoundError(`Book ${bookId} not found`)
      }

      const borrow = new Borrow({
        user: foundUser?._id,
        book: bookId,
        borrowDate,
        dueDate,
      })
      return await borrow.save()
    })
  )

  return borrow
}

const returnBook = async (borrowId: string): Promise<BorrowDocument | null> => {
  // Delete foundBorrow
  const foundBorrow = await Borrow.findByIdAndDelete(borrowId)

  if (!foundBorrow) {
    throw new NotFoundError(`Borrow ${borrowId} not found`)
  }

  // Update book status to available
  await Book.findByIdAndUpdate(
    foundBorrow.book,
    { status: Status.Available },
    {
      new: true,
      runValidators: true,
    }
  )

  return foundBorrow
}

export default {
  findAll,
  create,
  borrowBooks,
  returnBook,
}
