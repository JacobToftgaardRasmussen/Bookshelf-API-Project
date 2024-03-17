import express, { Request, Response } from "express"

const app = express()

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

app.listen(port, () => {
  console.log(`Server started listening on port ${port}`)
})
