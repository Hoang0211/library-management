import Borrow, { BorrowDocument } from '../models/Borrow'
import { NotFoundError } from '../helpers/apiError'

const findAll = async (): Promise<BorrowDocument[]> => {
  return Borrow.find().sort({ returnDate: 1 })
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

const update = async (
  borrowId: string,
  update: Partial<BorrowDocument>
): Promise<BorrowDocument | null> => {
  const foundBorrow = await Borrow.findByIdAndUpdate(borrowId, update, {
    new: true,
    runValidators: true,
  })

  if (!foundBorrow) {
    throw new NotFoundError(`Borrow ${borrowId} not found`)
  }

  return foundBorrow
}

const deleteBorrow = async (
  borrowId: string
): Promise<BorrowDocument | null> => {
  const foundBorrow = Borrow.findByIdAndDelete(borrowId)

  if (!foundBorrow) {
    throw new NotFoundError(`Borrow ${borrowId} not found`)
  }

  return foundBorrow
}

export default {
  findAll,
  findById,
  create,
  update,
  deleteBorrow,
}
