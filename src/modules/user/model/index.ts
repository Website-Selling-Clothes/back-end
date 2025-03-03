import { Gender, Status, UserRole } from "@share/model/base-model";
import { z } from "zod";
import {
  birthdayInvalid,
  emailInvalid,
  firstNameAtLeast2Characters,
  firstNameAtMost100Characters,
  genderInvalid,
  lastNameAtLeast2Characters,
  lastNameAtMost100Characters,
  passwordAtLeast6Characters,
  passwordAtMost30Characters,
  phoneAtLeast10Characters,
  phoneAtMost15Characters,
  roleInvalid,
  statusInvalid,
  userNameAtLeast5Characters,
  userNameAtMost100Characters,
} from "./error";

export const userSchema = z.object({
  id: z.string().uuid(),
  username: z
    .string()
    .min(5, userNameAtLeast5Characters.message)
    .max(100, userNameAtMost100Characters.message),
  phone: z
    .string()
    .min(10, phoneAtLeast10Characters.message)
    .max(15, phoneAtMost15Characters.message),
  email: z.string().email(emailInvalid.message),
  password: z
    .string()
    .min(6, passwordAtLeast6Characters.message)
    .max(30, passwordAtMost30Characters.message),
  salt: z.string(),
  firstName: z
    .string()
    .min(2, firstNameAtLeast2Characters.message)
    .max(100, firstNameAtMost100Characters.message),
  lastName: z
    .string()
    .min(2, lastNameAtLeast2Characters.message)
    .max(100, lastNameAtMost100Characters.message),
  birthday: z.string().date().nullable().optional(),
  role: z.nativeEnum(UserRole, roleInvalid),
  gender: z.nativeEnum(Gender, genderInvalid),
  status: z.nativeEnum(Status, statusInvalid),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const UserLoginDTOSchema = userSchema.pick({
  username: true,
  password: true,
});

export const UserRegistrationDTOSchema = userSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    status: true,
    role: true,
    salt: true,
  })
  .extend({
    confirmPassword: z.string(),
  });

export const UserCondDTOSchema = z.object({
  username: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;
export type UserLoginDTO = z.infer<typeof UserLoginDTOSchema>;
export type UserRegistrationDTO = z.infer<typeof UserRegistrationDTOSchema>;
export type UserCondDTO = z.infer<typeof UserCondDTOSchema>;
