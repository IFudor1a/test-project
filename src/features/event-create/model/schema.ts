import {z} from "zod";

export const schema = z.object({
    name: z.string().trim().refine(val => val !== "", {
        message: "Поле не может быть пустым",
    }),
})