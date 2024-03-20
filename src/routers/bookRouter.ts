import express from "express"
import bookController from "../controllers/bookController"

const bookRouter = express.Router()

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: the list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
bookRouter.get("/", bookController.getBooks)

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Gets a book by id
 *     tags: [Books]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of book
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: book info.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: book is not found
 */
bookRouter.get("/:id", bookController.getBookById)

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 *       400:
 *         description: Invalid input
 */
bookRouter.post("/", bookController.insertBook)

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Updates a book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: book id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookUpdate'
 *     responses:
 *       200:
 *         decsription: The book was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some errors happend.
 */
bookRouter.put("/:id", bookController.updateBookById)

/**
 * @swagger
 *  /book/{id}:
 *    delete:
 *      summary: Removes a book by id
 *      tags: [Books]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: book id
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: The book was deleted
 *        404:
 *          description: The post was not found
 */
bookRouter.delete("/:id", bookController.deleteBookById)

export default bookRouter
