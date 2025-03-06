import { AppError } from "@share/app-error";
import { IUserCommandRepo, IUserQueryRepo, IUserUseCase } from "../interface";
import {
  UserLoginDTO,
  User,
  UserRegistrationDTO,
  UserRegistrationDTOSchema,
  UserLoginDTOSchema,
} from "../model";
import { UserRepository } from "../repository";
import { ErrSomeThingWentWrong } from "@share/model/base-error";
import {
  ErrInvalidUsernameAndPassword,
  ErrUserInactivated,
  passwordNotMatch,
  userNameNotExisted,
} from "../model/error";
import { StatusCodes } from "http-status-codes";
import { v7 } from "uuid";
import bcrypt from "bcrypt";
import { Gender, Status, UserRole } from "@share/model/base-model";
import { jwtProvider } from "@share/component/jwt";
export class UserUseCase implements IUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async register(data: UserRegistrationDTO): Promise<string> {
    try {
      const dto = UserRegistrationDTOSchema.parse(data);

      // 1. Check email existed
      const existedUser = await this.repository.findByCond({
        username: dto.username,
      });

      // 2. Check confirm password
      if (dto.password !== dto.confirmPassword) {
        throw AppError.from(passwordNotMatch, StatusCodes.BAD_REQUEST);
      }

      if (existedUser) {
        throw AppError.from(userNameNotExisted, StatusCodes.BAD_REQUEST);
      }

      // 2. Gen salt and hash password
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hash(`${dto.password}.${salt}`, 10);

      // 3. Create new user
      const newId = v7();
      const { confirmPassword, ...actualDto } = dto;
      const newUser: User = {
        ...actualDto,
        password: hashPassword,
        status: Status.ACTIVE,
        id: newId,
        gender: Gender.UNKNOWN,
        salt: salt,
        role: UserRole.USER,
      };

      // 4. Insert new user to database
      await this.repository.create(newUser);

      return newId;
    } catch (error) {
      throw AppError.from(error as AppError, StatusCodes.BAD_REQUEST);
    }
  }

  async login(data: UserLoginDTO): Promise<string> {
    const dto = UserLoginDTOSchema.parse(data);

    // 1. Find user with email from DTO
    const user = await this.repository.findByCond({ username: dto.username });
    if (!user) {
      throw AppError.from(ErrInvalidUsernameAndPassword, 400).withLog(
        "Email not found"
      );
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(
      `${dto.password}.${user.salt}`,
      user.password
    );

    if (!isMatch) {
      throw AppError.from(ErrInvalidUsernameAndPassword, 400).withLog(
        "Password is incorrect"
      );
    }

    if (user.status === Status.DELETED || user.status === Status.INACTIVE) {
      throw AppError.from(ErrUserInactivated, 400);
    }

    // 3. Return token
    const role = user.role;
    const token = jwtProvider.generateToken({ sub: user.id, role });
    return token;
  }
  profile(userId: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
}

