import { Types } from 'mongoose'

import Book, { BookDocument, Category, Status } from '../models/Book'
import Author from '../models/Author'
import Borrow from '../models/Borrow'
import { NotFoundError } from '../helpers/apiError'

const findAllBooks = async (): Promise<BookDocument[]> => {
  return Book.find().sort({ title: 1 }).populate('authors')
}

type SearchedBookResType = {
  books: BookDocument[]
  count: number
}
const searchAllBooks = async (
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

const findBookById = async (bookId: string): Promise<BookDocument> => {
  const foundBook = await Book.findById(bookId).populate('authors')

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const create = async (book: BookDocument): Promise<BookDocument> => {
  return book.save()
}

const updateBook = async (
  bookId: string,
  update: Partial<BookDocument>
): Promise<BookDocument | null> => {
  // Get book
  const foundBook = await Book.findById(bookId)
  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  // Remove update book from its authors'books list
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

  // Update book
  const updatedBook = await Book.findByIdAndUpdate(bookId, update, {
    new: true,
    runValidators: true,
  })
  if (!updatedBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  // Add update book to its authors'books list
  const addBookForAuthor = async (authorId: Types.ObjectId) => {
    const foundAuthor = await Author.findByIdAndUpdate(
      authorId,
      { $push: { books: bookId } },
      {
        new: true,
        runValidators: true,
      }
    )
    if (!foundAuthor) {
      throw new NotFoundError(`Author ${authorId} not found`)
    }
  }
  await updatedBook.authors.forEach((authorId) => addBookForAuthor(authorId))

  return updatedBook
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
  findAllBooks,
  searchAllBooks,
  findBookById,
  create,
  updateBook,
  removeFromAuthors,
  borrow,
  deleteBook,
}
