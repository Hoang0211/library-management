import { Status } from '../models/Book'
import Book from '../models/Book'
import Borrow, { BorrowDocument } from '../models/Borrow'
import { NotFoundError } from '../helpers/apiError'

const findAll = async (): Promise<BorrowDocument[]> => {
  return Borrow.find().sort({ returnDate: 1 }).populate('user').populate('book')
}

const create = async (borrow: BorrowDocument): Promise<BorrowDocument> => {
  return borrow.save()
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
  returnBook,
}
