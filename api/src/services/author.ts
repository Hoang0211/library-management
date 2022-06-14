import { Types } from 'mongoose'

import Book from '../models/Book'
import Author, { AuthorDocument } from '../models/Author'
import { NotFoundError } from '../helpers/apiError'

const findAllAuthors = async (): Promise<AuthorDocument[]> => {
  return Author.find().sort({ firstName: 1 })
}

type SearchedAuthorResType = {
  authors: AuthorDocument[]
  count: number
}
const searchAllAuthors = async (
  keyword: string,
  limit: number,
  page: number,
  sortedBy: string,
  sortOrder: number
): Promise<SearchedAuthorResType> => {
  const sort: any = {}
  sort[sortedBy] = sortOrder

  const authors = await Author.find({
    $or: [
      {
        firstName: { $regex: `${keyword}`, $options: 'i' },
      },
      {
        lastName: { $regex: `${keyword}`, $options: 'i' },
      },
    ],
  })
    .populate('books')
    .limit(limit)
    .skip(limit * (page - 1))
    .sort(sort)

  const count = await Author.find({
    $or: [
      {
        firstName: { $regex: `${keyword}`, $options: 'i' },
      },
      {
        lastName: { $regex: `${keyword}`, $options: 'i' },
      },
    ],
  }).count()

  return {
    authors,
    count,
  }
}

const findAuthorById = async (authorId: string): Promise<AuthorDocument> => {
  const foundAuthor = await Author.findById(authorId).populate('books')

  if (!foundAuthor) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }

  return foundAuthor
}

const createAuthor = async (
  author: AuthorDocument
): Promise<AuthorDocument> => {
  return author.save()
}

const updateAuthor = async (
  authorId: string,
  update: Partial<AuthorDocument>
): Promise<AuthorDocument | null> => {
  const foundAuthor = await Author.findByIdAndUpdate(authorId, update, {
    new: true,
    runValidators: true,
  })

  if (!foundAuthor) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }

  return foundAuthor
}

const deleteAuthor = async (
  authorId: string
): Promise<AuthorDocument | null> => {
  // Delete author
  const foundAuthor = await Author.findByIdAndDelete(authorId)
  if (!foundAuthor) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }

  // Remove deleted author from its books'authors list
  await foundAuthor.books.forEach((bookId) =>
    removeAuthorForBook(bookId, authorId)
  )

  return foundAuthor
}

// Helper functions
const removeAuthorForBook = async (
  bookId: Types.ObjectId,
  authorId: string
) => {
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
}

export default {
  findAllAuthors,
  searchAllAuthors,
  findAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
}
