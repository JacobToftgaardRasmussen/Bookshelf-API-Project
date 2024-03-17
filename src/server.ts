import express, { Request, Response } from "express"

const app = express()
app.use(express.json())

const port = 3000

const books = [
  { title: "A very good book", author: "Bob Alisson", published: true },
  { title: "Another book", author: "Jim Jimmyson", published: false },
]

app.get("/books", (req: Request, res: Response) => {
  res.status(200).json(books)
})

app.get("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params
  const foundBook = books[Number(id)]
  res.status(200).json(foundBook)
})

app.post("/books", (req: Request, res: Response) => {
  const { title, author, published } = req.body
  books.push({ title, author, published })
  res.status(201).json(books)
})

app.put("/books/:id", (req: Request, res: Response) => {
  const { title, author, published } = req.body
  const { id } = req.params
  const updatedBook = { title, author, published }
  books[Number(id)] = updatedBook
  res.status(200).json(books)
})

app.delete("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params
  books.splice(Number(id), 1)
  res.status(200).json(books)
})

app.listen(port, () => {
  console.log(`Server started listening on port ${port}`)
})
