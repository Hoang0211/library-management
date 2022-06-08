import { Request, Response, NextFunction } from 'express'

import Book from '../models/Book'
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
      AuthorService.updateBooks(authorId, book._id, 'add')
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
    const updatedBook = await BookService.update(bookId, update)
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

// This is for initial data for testing
export const createInitialData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data } = req.body

    for (let i = 0; i < data.length; i++) {
      const book = new Book({
        isbn: data[i].isbn,
        title: data[i].title,
        description: data[i].description,
        authors: data[i].authors,
        publisher: data[i].publisher,
        publishedDate: data[i].publishedDate,
        category: data[i].category,
        numPage: data[i].numPage,
        status: data[i].status,
      })

      await BookService.create(book)
    }

    res.json({
      message: 'Insert all initial data',
    })
  } catch (error) {
    console.log(error)
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
