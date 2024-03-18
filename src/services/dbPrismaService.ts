import { Book, PrismaClient } from "@prisma/client"

class DBPrismaService {
  private prisma = new PrismaClient()

  public async getBooks(): Promise<Book[]> {
    const foundBooks = await this.prisma.book.findMany()
    return foundBooks
  }

  public async insertBook(book: {
    title: string
    author: string
    published: boolean
  }): Promise<Book> {
    const createdBook = await this.prisma.book.create({ data: book })
    return createdBook
  }

  public async getBookById(id: number): Promise<Book> {
    const foundBook: Book = await this.prisma.book.findUniqueOrThrow({
      where: {
        id: id,
      },
    })
    return foundBook
  }

  public async updateBookById(
    id: number,
    book: {
      title: string | undefined
      author: string | undefined
      published: boolean | undefined
    }
  ): Promise<Book> {
    const data = new Map()
    Object.keys(book).forEach((key) => {
      const value = book[key as keyof typeof book]
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
  }

  public async deleteBook(id: number): Promise<void> {
    await this.prisma.book.delete({
      where: {
        id: id,
      },
    })
    return
  }
}

export default new DBPrismaService()
