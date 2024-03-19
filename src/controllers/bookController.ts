import { Request, Response } from "express"
import dbPrismaService from "../services/dbPrismaService"
import errorHandler from "../services/errorHandler"

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
    const { title, author, published } = req.body
    try {
      const newBook = await dbPrismaService.insertBook({
        title,
        author,
        published,
      })
      res.status(201).json(newBook)
    } catch (error: unknown) {
      const { status, message } = errorHandler.handleError(error)
      res.status(status).send(message)
    }
  }

  public async updateBookById(req: Request, res: Response) {
    const { title, author, published } = req.body
    const { id } = req.params
    const updatedBook = { title, author, published }
    try {
      const result = await dbPrismaService.updateBookById(
        Number(id),
        updatedBook
      )
      res.status(200).json(result)
    } catch (error: unknown) {
      const { status, message } = errorHandler.handleError(error)
      res.status(status).send(message)
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
