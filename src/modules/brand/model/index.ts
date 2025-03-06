import { z } from "zod";
import {
    brandNameAtLeast5Characters,
    brandNameAtMost100Characters,
    brandNameNotExisted,
    emailInvalid,
    ErrEmailExisted
} from "./error"

export const brandSchema = z.object({
    id: z.string().uuid(),
    name: z 
    .string()
    .min(5,brandNameAtLeast5Characters.message)
    .max(100,brandNameAtMost100Characters.message),
    email: z.string().email(emailInvalid.message),
    updatedAt: z.date().optional(),
});

export const BrandCondDTOSchema = z.object({
    name: z.string().trim().optional(),//.trim() để bỏ khoảng trắng dư thừa
    email: z.string().trim().optional(),
});

export type Brand = z.infer<typeof brandSchema>;
export type BrandCondDTO = z.infer<typeof BrandCondDTOSchema>;