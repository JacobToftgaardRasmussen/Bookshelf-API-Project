import express from "express"
import bookRouter from "./routers/bookRouter"

const app = express()
app.use(express.json())
app.use("/books", bookRouter)

export default app
