import { z } from "zod"

export const CreateBookSchema = z.object({
  title: z.string(),
  author: z.string(),
  published: z.boolean(),
})

export const UpdateBookSchema = z.object({
  title: z.string().nullable(),
  author: z.string().nullable(),
  published: z.boolean().nullable(),
})
