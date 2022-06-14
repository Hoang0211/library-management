import { Request, Response, NextFunction } from 'express'

import Author from '../models/Author'
import AuthorService from '../services/Author'
import BookService from '../services/Book'
import { BadRequestError } from '../helpers/apiError'

// GET /authors
export const findAllAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await AuthorService.findAllAuthors())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /authors/search?keyword=&limit=5&page=1&sortedBy=firstName&sortOrder=asc
export const searchAllAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { keyword, limit, page, sortedBy, sortOrder } = req.query as {
      keyword: string
      limit: string
      page: string
      sortedBy: string
      sortOrder: string
    }
    const sortedByArr = ['firstName']
    const sortOrderArr = ['asc', 'des']

    // Check for undefined
    if (!keyword) {
      keyword = ''
    }
    if (!limit || /^\?([1-9]\d*)$/.test(limit)) {
      limit = '5'
    }
    if (!page || /^\?([1-9]\d*)$/.test(page)) {
      page = '1'
    }
    if (!sortedBy || !sortedByArr.includes(sortedBy)) {
      sortedBy = 'firstName'
    }
    if (!sortOrder || !sortOrderArr.includes(sortOrder)) {
      sortOrder = 'asc'
    }

    const limitNum = Number(limit)
    const pageNum = Number(page)
    const sortOrderNum = sortOrder === 'asc' ? 1 : -1
    res.json(
      await AuthorService.searchAllAuthors(
        keyword,
        limitNum,
        pageNum,
        sortedBy,
        sortOrderNum
      )
    )
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /authors/:authorId
export const findAuthorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await AuthorService.findAuthorById(req.params.authorId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// POST /authors
export const createAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, biography } = req.body

    const author = new Author({
      firstName,
      lastName,
      biography,
    })

    const createdAuthor = await AuthorService.createAuthor(author)
    res.json(createdAuthor)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /authors/:authorId
export const updateAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const authorId = req.params.authorId
    const updatedAuthor = await AuthorService.updateAuthor(authorId, update)
    res.json(updatedAuthor)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /authors/:authorId
export const deleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // // Validate author
    // const deletedAuthor = await AuthorService.findById(req.params.authorId)

    // // Update author list for each book
    // await deletedAuthor.books.forEach((bookId) =>
    //   BookService.removeFromAuthors(bookId, deletedAuthor._id)
    // )

    // // Delete author
    await AuthorService.deleteAuthor(req.params.authorId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
