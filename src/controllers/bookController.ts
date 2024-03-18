import { Request, Response } from "express"
import dbPrismaService from "../services/dbPrismaService"

class BookController {
  public async getBooks(req: Request, res: Response) {
    const books = await dbPrismaService.getBooks()
    res.status(200).json(books)
  }

  public async getBookById(req: Request, res: Response) {
    const { id } = req.params
    const foundBook = await dbPrismaService.getBookById(Number(id))
    res.status(200).json(foundBook)
  }

  public async insertBook(req: Request, res: Response) {
    const { title, author, published } = req.body
    const newBook = await dbPrismaService.insertBook({
      title,
      author,
      published,
    })
    res.status(201).json(newBook)
  }

  public async updateBookById(req: Request, res: Response) {
    const { title, author, published } = req.body
    const { id } = req.params
    const updatedBook = { title, author, published }
    const result = await dbPrismaService.updateBookById(Number(id), updatedBook)
    res.status(200).json(result)
  }

  public async deleteBookById(req: Request, res: Response) {
    const { id } = req.params
    dbPrismaService.deleteBook(Number(id))
    res.sendStatus(200)
  }
}

export default new BookController()
