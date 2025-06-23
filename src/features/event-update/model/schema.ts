import {z} from "zod";

export const schema = z.object({
    events: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "Поле не может быть пустым",
    }),
    status: z.string({required_error: "Поле не может быть пустым"}).refine(val => val !== "", {
        message: "Поле не может быть пустым",
    }),
})