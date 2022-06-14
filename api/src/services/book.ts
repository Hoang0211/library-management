import { Types } from 'mongoose'

import Book, { BookDocument, Category, Status } from '../models/Book'
import Author from '../models/Author'
import Borrow from '../models/Borrow'
import { NotFoundError } from '../helpers/apiError'

const findAll = async (): Promise<BookDocument[]> => {
  return Book.find().sort({ title: 1 }).populate('authors')
}

type SearchedBookResType = {
  books: BookDocument[]
  count: number
}

const searchAll = async (
  keyword: string,
  categories: string[],
  statuses: string[],
  limit: number,
  page: number,
  sortedBy: string,
  sortOrder: number
): Promise<SearchedBookResType> => {
  const sort: any = {}
  sort[sortedBy] = sortOrder

  const books = await Book.find({
    $and: [
      {
        $or: [
          {
            isbn: { $regex: `${keyword}`, $options: 'i' },
          },
          {
            title: { $regex: `${keyword}`, $options: 'i' },
          },
        ],
      },
      {
        category: { $in: categories },
      },
      {
        status: { $in: statuses },
      },
    ],
  })
    .populate('authors')
    .limit(limit)
    .skip(limit * (page - 1))
    .sort(sort)

  const count = await Book.find({
    $and: [
      {
        $or: [
          {
            isbn: { $regex: `${keyword}`, $options: 'i' },
          },
          {
            title: { $regex: `${keyword}`, $options: 'i' },
          },
        ],
      },
      {
        category: { $in: categories },
      },
      {
        status: { $in: statuses },
      },
    ],
  }).count()

  return {
    books,
    count,
  }
}

const findById = async (bookId: string): Promise<BookDocument> => {
  const foundBook = await Book.findById(bookId).populate('authors')

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

// Remove author from book's authors list when deleting author
const removeFromAuthors = async (
  bookId: Types.ObjectId,
  authorId: string
): Promise<BookDocument | null> => {
  const foundBook = await Book.findByIdAndUpdate(
    bookId,
    { $pull: { authors: authorId } },
    {
      new: true,
      runValidators: true,
    }
  )

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

// Borrow
const borrow = async (bookId: string): Promise<BookDocument | null> => {
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

  return foundBook
}

const deleteBook = async (bookId: string): Promise<BookDocument | null> => {
  // Delete book
  const foundBook = await Book.findByIdAndDelete(bookId)
  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  // Remove deleted book from its authors'books list
  const removeBookForAuthor = async (authorId: Types.ObjectId) => {
    const foundAuthor = await Author.findByIdAndUpdate(
      authorId,
      { $pull: { books: bookId } },
      {
        new: true,
        runValidators: true,
      }
    )
    if (!foundAuthor) {
      throw new NotFoundError(`Author ${authorId} not found`)
    }
  }
  await foundBook.authors.forEach((authorId) => removeBookForAuthor(authorId))

  // Remove its borrow
  await Borrow.findOneAndRemove({ book: bookId })

  return foundBook
}

export default {
  findAll,
  searchAll,
  findById,
  create,
  update,
  removeFromAuthors,
  borrow,
  deleteBook,
}
