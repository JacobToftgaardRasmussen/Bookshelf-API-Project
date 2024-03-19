import { Request, Response } from "express"
import dbPrismaService from "../services/dbPrismaService"
import errorHandler from "../services/errorHandler"
import { CreateBookSchema, UpdateBookSchema } from "../zodSchema"

class BookController {
  public async getBooks(req: Request, res: Response) {
    try {
      const books = await dbPrismaService.getBooks()
      res.status(200).json(books)
    } catch (error: unknown) {
      const { status, message } = errorHandler.handleError(error)
      res.status(status).send(message)
    }
  }

  public async getBookById(req: Request, res: Response) {
    const { id } = req.params
    try {
      const foundBook = await dbPrismaService.getBookById(Number(id))
      res.status(200).json(foundBook)
    } catch (error: unknown) {
      const { status, message } = errorHandler.handleError(error)
      res.status(status).send(message)
    }
  }

  public async insertBook(req: Request, res: Response) {
    const book = CreateBookSchema.safeParse(req.body)
    if (book.success) {
      try {
        const newBook = await dbPrismaService.insertBook(book.data)
        res.status(201).json(newBook)
      } catch (error: unknown) {
        const { status, message } = errorHandler.handleError(error)
        res.status(status).send(message)
      }
    } else {
      res.status(400).json(book.error)
    }
  }

  public async updateBookById(req: Request, res: Response) {
    const bookUpdate = UpdateBookSchema.safeParse(req.body)
    if (bookUpdate.success) {
      try {
        const { id } = req.params
        const idAsNumber = Number(id)
        const result = await dbPrismaService.updateBookById(
          idAsNumber,
          bookUpdate.data
        )
        res.status(200).json(result)
      } catch (error: unknown) {
        const { status, message } = errorHandler.handleError(error)
        res.status(status).send(message)
      }
    } else {
      res.status(400).json(bookUpdate.error.name)
    }
  }

  public async deleteBookById(req: Request, res: Response) {
    const { id } = req.params
    try {
      await dbPrismaService.deleteBook(Number(id))
      res.sendStatus(200)
    } catch (error: unknown) {
      const { status, message } = errorHandler.handleError(error)
      res.status(status).send(message)
    }
  }
}

export default new BookController()
