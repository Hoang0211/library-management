import { Types } from 'mongoose'

import Author, { AuthorDocument } from '../models/Author'
import { NotFoundError } from '../helpers/apiError'

const findAll = async (): Promise<AuthorDocument[]> => {
  return Author.find().sort({ firstName: 1 })
}

type SearchedAuthorResType = {
  authors: AuthorDocument[]
  count: number
}

const searchAll = async (
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

const findById = async (authorId: string): Promise<AuthorDocument> => {
  const foundAuthor = await Author.findById(authorId).populate('books')

  if (!foundAuthor) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }

  return foundAuthor
}

const create = async (author: AuthorDocument): Promise<AuthorDocument> => {
  return author.save()
}

const update = async (
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

// Add book to author's books list when adding new book
const addToBooks = async (
  authorId: string | Types.ObjectId,
  bookId: string
): Promise<AuthorDocument | null> => {
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

  return foundAuthor
}

// Remove book from author's books list when deleting book
const removeFromBooks = async (
  authorId: Types.ObjectId,
  bookId: string
): Promise<AuthorDocument | null> => {
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

  return foundAuthor
}

const deleteAuthor = async (
  authorId: string
): Promise<AuthorDocument | null> => {
  const foundAuthor = Author.findByIdAndDelete(authorId)

  if (!foundAuthor) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }

  return foundAuthor
}

export default {
  findAll,
  searchAll,
  findById,
  create,
  update,
  addToBooks,
  removeFromBooks,
  deleteAuthor,
}
