import { z } from "zod";
import {
    categoriesNameAtLeast5Characters,
    categoriesNameAtMost100Characters,
    categoriesNameNotExisted,
} from "./error"

export const categoriesSchema = z.object({
    id: z.string().uuid(),
    name: z 
    .string()
    .min(5,categoriesNameAtLeast5Characters.message)
    .max(100,categoriesNameAtMost100Characters.message),
});

export const categoriesCondDTOSchema = z.object({
    name: z.string().trim().optional(),//.trim() để bỏ khoảng trắng dư thừa
    type: z.string().trim().optional(),
});

export type Categories = z.infer<typeof categoriesSchema>;
export type CategoriesCondDTO = z.infer<typeof categoriesCondDTOSchema>;