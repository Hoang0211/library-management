import Author, { AuthorDocument } from '../models/Author'
import { NotFoundError } from '../helpers/apiError'

const findAll = async (): Promise<AuthorDocument[]> => {
  return Author.find().sort({ firstName: 1 })
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

const updateBooks = async (
  authorId: string,
  bookId: string,
  action: 'add' | 'delete'
): Promise<AuthorDocument | null> => {
  const getActionObject = () => {
    if (action === 'add') {
      return { $push: { books: bookId } }
    } else {
      return { $pull: { books: bookId } }
    }
  }

  const foundAuthor = await Author.findByIdAndUpdate(
    authorId,
    getActionObject(),
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
  findById,
  create,
  update,
  updateBooks,
  deleteAuthor,
}
