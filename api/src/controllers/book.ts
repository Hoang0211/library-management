import { Request, Response, NextFunction } from 'express'

import Book, { Category, Status } from '../models/Book'
import BookService from '../services/Book'
import Author from '../models/Author'
import AuthorService from '../services/Author'
import { BadRequestError } from '../helpers/apiError'

// GET /books/
export const findAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BookService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /books/search?keyword=&categories=article+book+journal+thesis+other&statuses=available+borrowed&limit=5&page=1&sortedBy=title&sortOrder=asc
export const searchAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { keyword, category, status, limit, page, sortedBy, sortOrder } =
      req.query as {
        keyword: string
        category: string
        status: string
        limit: string
        page: string
        sortedBy: string
        sortOrder: string
      }
    const categoryArr = ['article', 'book', 'journal', 'thesis', 'other']
    const statusArr = ['available', 'borrowed']
    const sortedByArr = ['title', 'publishedDate']
    const sortOrderArr = ['asc', 'des']

    // Check for undefined
    if (!keyword) {
      keyword = ''
    }
    if (
      !category ||
      !category.split('+').every((category) => categoryArr.includes(category))
    ) {
      category = categoryArr.join('+')
    }
    if (
      !status ||
      !status.split('+').every((status) => statusArr.includes(status))
    ) {
      status = statusArr.join('+')
    }
    if (!limit || /^\?([1-9]\d*)$/.test(limit)) {
      limit = '5'
    }
    if (!page || /^\?([1-9]\d*)$/.test(page)) {
      page = '1'
    }
    if (!sortedBy || !sortedByArr.includes(sortedBy)) {
      sortedBy = 'title'
    }
    if (!sortOrder || !sortOrderArr.includes(sortOrder)) {
      sortOrder = 'asc'
    }

    const categories = category.split('+')
    const statuses = status.split('+')
    const limitNum = Number(limit)
    const pageNum = Number(page)
    const sortOrderNum = sortOrder === 'asc' ? 1 : -1
    res.json(
      await BookService.searchAll(
        keyword,
        categories,
        statuses,
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

// GET /books/:bookId
export const findBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BookService.findById(req.params.bookId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// POST /books
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      isbn,
      title,
      description,
      authors,
      publisher,
      publishedDate,
      category,
      numPage,
      status,
    } = req.body

    const book = new Book({
      isbn,
      title,
      description,
      authors,
      publisher,
      publishedDate,
      category,
      numPage,
      status,
    })

    await BookService.create(book)

    await authors.forEach((authorId: string) => {
      AuthorService.addToBooks(authorId, book._id)
    })

    res.json(book)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /books/:bookId
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const bookId = req.params.bookId

    // Validate book
    const updateBook = await BookService.findById(req.params.bookId)

    // Remove this book from all author's books list before updating book
    await updateBook.authors.forEach((authorId) =>
      AuthorService.removeFromBooks(authorId, updateBook._id)
    )

    // Update book
    const updatedBook = await BookService.update(bookId, update)

    // Add this book to all author's books list after updating book
    await updatedBook?.authors.forEach((authorId) => {
      AuthorService.addToBooks(authorId, updateBook._id)
    })

    res.json(updatedBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /books/:bookId
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await BookService.deleteBook(req.params.bookId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
