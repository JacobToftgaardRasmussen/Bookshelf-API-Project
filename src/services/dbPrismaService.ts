import { Book, PrismaClient } from "@prisma/client"
import { z } from "zod"
import { CreateBookSchema, UpdateBookSchema } from "../zodSchema"

class DBPrismaService {
  private prisma = new PrismaClient()

  public async getBooks(): Promise<Book[]> {
    try {
      const foundBooks = await this.prisma.book.findMany()
      return foundBooks
    } catch (error: unknown) {
      this.logError(error)
      throw error
    }
  }

  public async insertBook(
    book: z.infer<typeof CreateBookSchema>
  ): Promise<Book> {
    try {
      const createdBook = await this.prisma.book.create({ data: book })
      return createdBook
    } catch (error: unknown) {
      this.logError(error)
      throw error
    }
  }

  public async getBookById(id: number): Promise<Book> {
    try {
      const foundBook: Book = await this.prisma.book.findUniqueOrThrow({
        where: {
          id: id,
        },
      })
      return foundBook
    } catch (error: unknown) {
      this.logError(error)
      throw error
    }
  }

  public async updateBookById(
    id: number,
    bookUpdate: z.infer<typeof UpdateBookSchema>
  ): Promise<Book> {
    try {
      const data = new Map()
      Object.keys(bookUpdate).forEach((key) => {
        const value = bookUpdate[key as keyof typeof bookUpdate]
        if (value) {
          data.set(key, value)
        }
      })

      const updatedBook: Book = await this.prisma.book.update({
        where: {
          id: id,
        },
        data: Object.fromEntries(data),
      })
      return updatedBook
    } catch (error: unknown) {
      this.logError(error)
      throw error
    }
  }

  public async deleteBook(id: number): Promise<void> {
    try {
      await this.prisma.book.delete({
        where: {
          id: id,
        },
      })
      return
    } catch (error: unknown) {
      this.logError(error)
      throw error
    }
  }

  private logError(error: unknown) {
    console.log("A prisma error orcurred")
    console.log(error)
  }
}

export default new DBPrismaService()
