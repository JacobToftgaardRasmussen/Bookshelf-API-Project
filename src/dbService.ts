import { Pool } from "pg"

export type Book = {
  title: string
  author: string
  published: boolean
  id: Number
}

class DBService {
  private pool = new Pool({
    user: "myuser",
    password: "mypassword",
    host: "localhost",
    database: "mydb",
    port: 5432,
  })

  public async getBooks(): Promise<Book[]> {
    const result = await this.pool.query("SELECT * FROM book")
    return result.rows as Book[]
  }

  public async getBookById(id: number): Promise<Book> {
    const result = await this.pool.query("SELECT * FROM book WHERE id = $1", [
      id,
    ])
    return result.rows[0] as Book
  }

  public async insertBook(book: {
    title: string
    author: string
    published: boolean
  }): Promise<void> {
    await this.pool.query(
      "INSERT INTO book (title, author, published) VALUES ($1, $2, $3)",
      [book.title, book.author, book.published]
    )
    return
  }

  public async updateBookById(
    id: number,
    book: {
      title: string | undefined
      author: string | undefined
      published: boolean | undefined
    }
  ): Promise<Book> {
    let query = "UPDATE book SET "
    if (book.title !== undefined) query += `title = '${book.title}', `
    if (book.author !== undefined) query += `author = '${book.author}', `
    if (book.published !== undefined) query += `published = ${book.published} `
    query += `WHERE id = ${id}`
    await this.pool.query(query)
    const updatedBook = await this.getBookById(id)
    return updatedBook as Book
  }

  public async deleteBook(id: number): Promise<void> {
    const result = await this.pool.query("DELETE FROM book WHERE id = $1", [id])
    return
  }
}

export default new DBService()
