import express from "express"
import bookController from "../controllers/bookController"

const bookRouter = express.Router()

bookRouter.get("/", bookController.getBooks)
bookRouter.get("/:id", bookController.getBookById)
bookRouter.post("/", bookController.insertBook)
bookRouter.put("/:id", bookController.updateBookById)
bookRouter.delete("/:id", bookController.deleteBookById)

export default bookRouter
