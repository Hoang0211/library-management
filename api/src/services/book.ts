import Book, { BookDocument } from '../models/Book'
import { NotFoundError } from '../helpers/apiError'

const findAll = async (): Promise<BookDocument[]> => {
  return Book.find().sort({ numPage: 1 })
}

const findById = async (bookId: string): Promise<BookDocument> => {
  const foundBook = await Book.findById(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const create = async (book: BookDocument): Promise<BookDocument> => {
  return book.save()
}

const update = async (
  bookId: string,
  update: Partial<BookDocument>
): Promise<BookDocument | null> => {
  const foundBook = await Book.findByIdAndUpdate(bookId, update, {
    new: true,
    runValidators: true,
  })

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const deleteBook = async (bookId: string): Promise<BookDocument | null> => {
  const foundBook = Book.findByIdAndDelete(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

export default {
  findAll,
  findById,
  create,
  update,
  deleteBook,
}
