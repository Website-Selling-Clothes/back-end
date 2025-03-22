import { z } from "zod";
import { Gender, Status, UserRole } from "@share/model/base-model";

import { supplierNameTooShort, addressTooShort, phoneTooShort, invalidEmail, statusInvalid } from "./error";

export const supplierSchema = z.object({
  id: z.string().uuid(),
  name: z
  .string()
  .min(2, supplierNameTooShort.message)
  .max(255),
  address: z
  .string()
  .min(5, addressTooShort.message)
  .max(255),
  phone: z
  .string()
  .min(10, phoneTooShort.message)
  .max(20),
  email: z.string().email(invalidEmail.message),
  status: z.nativeEnum(Status, statusInvalid),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Supplier = z.infer<typeof supplierSchema>;
