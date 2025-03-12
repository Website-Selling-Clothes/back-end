import { AppError } from "@share/app-error";
import { IBrandQueryRepo, IBrandCommandRepo, IBrandUseCase} from "../interface";
import { BrandRepository } from "../repository";
import { ErrSomeThingWentWrong } from "@share/model/base-error";
import { ErrBrandInactivated } from "../model/error";
import { StatusCodes } from "http-status-codes";
import { v7 } from "uuid";
import bcrypt from "bcrypt";
import { jwtProvider } from "@share/component/jwt";

export class BrandUseCase {
  private repository: BrandRepository;

  constructor(repository: BrandRepository) {
    this.repository = repository;
  }

  async create(name: string) {
    return await this.repository.create({ name });
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(id: number) {
    return await this.repository.findOne(id);
  }
}

// export class BrandUseCase implements IBrandUseCase {
  
// };
