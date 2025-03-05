import { z } from "zod";
import {
    brandNameAtLeast5Characters,
    brandNameAtMost100Characters,
    brandNameNotExisted,
    emailInvalid,
    ErrEmailExisted
} from "./error"

export const brandShema = z.object({
    id: z.string().uuid(),
    name: z 
    .string()
    .min(5,brandNameAtLeast5Characters.message)
    .max(100,brandNameAtMost100Characters.message),
    email: z.string().email(emailInvalid.message),
    updatedAt: z.date().optional(),
});

export const BrandCondDTOSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
});

export type Brand = z.infer<typeof brandShema>;
export type BrandCondDTO = z.infer<typeof BrandCondDTOSchema>;