import express, { Request, Response } from "express"
import dbPrismaService from "./dbPrismaService"

const app = express()
app.use(express.json())

const port = 3000

app.get("/books", async (req: Request, res: Response) => {
  const books = await dbPrismaService.getBooks()
  res.status(200).json(books)
})

app.get("/books/:id", async (req: Request, res: Response) => {
  const { id } = req.params
  const foundBook = await dbPrismaService.getBookById(Number(id))
  res.status(200).json(foundBook)
})

app.post("/books", async (req: Request, res: Response) => {
  const { title, author, published } = req.body
  const newBook = await dbPrismaService.insertBook({ title, author, published })
  res.status(201).json(newBook)
})

app.put("/books/:id", async (req: Request, res: Response) => {
  const { title, author, published } = req.body
  const { id } = req.params
  const updatedBook = { title, author, published }
  const result = await dbPrismaService.updateBookById(Number(id), updatedBook)
  res.status(200).json(result)
})

app.delete("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params
  dbPrismaService.deleteBook(Number(id))
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Server started listening on port ${port}`)
})
