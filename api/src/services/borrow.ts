import { Status } from '../models/Book'
import Book from '../models/Book'
import Borrow, { BorrowDocument } from '../models/Borrow'
import { NotFoundError } from '../helpers/apiError'

const findAll = async (): Promise<BorrowDocument[]> => {
  return Borrow.find().sort({ returnDate: 1 }).populate('user').populate('book')
}

const findById = async (borrowId: string): Promise<BorrowDocument> => {
  const foundBorrow = await Borrow.findById(borrowId)

  if (!foundBorrow) {
    throw new NotFoundError(`Borrow ${borrowId} not found`)
  }

  return foundBorrow
}

const create = async (borrow: BorrowDocument): Promise<BorrowDocument> => {
  return borrow.save()
}

// const update = async (
//   borrowId: string,
//   update: Partial<BorrowDocument>
// ): Promise<BorrowDocument | null> => {
//   const foundBorrow = await Borrow.findByIdAndUpdate(borrowId, update, {
//     new: true,
//     runValidators: true,
//   })

//   if (!foundBorrow) {
//     throw new NotFoundError(`Borrow ${borrowId} not found`)
//   }

//   return foundBorrow
// }

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
  findById,
  create,
  // update,
  returnBook,
}
