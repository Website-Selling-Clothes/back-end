import { AppError } from "@share/app-error";
import { ISupplierCommandRepo, ISupplierQueryRepo, ISupplierUseCase } from "../interface";
import { Supplier, supplierSchema } from "../model";
import { v4 as uuidv4 } from "uuid";
import { StatusCodes } from "http-status-codes";


export class SupplierUseCase implements ISupplierUseCase {
  constructor(private readonly repository: ISupplierCommandRepo & ISupplierQueryRepo) {}

  async create(data: Partial<Supplier>): Promise<string> {
    try {
      // Validate input data
      const dto = supplierSchema.parse(data);

      // Generate new ID
      const newId = uuidv4();

      // Create supplier object
      const newSupplier: Supplier = { ...dto, id: newId };

      // Insert into database
      await this.repository.create(newSupplier);

      return newId;
    } catch (error) {
      throw AppError.from(error as AppError, StatusCodes.BAD_REQUEST);
    }
  }

  async updateById(id: string, data: Partial<Supplier>): Promise<boolean> {
    try {
      // Validate input
      const dto = supplierSchema.partial().parse(data);

      // Update supplier
      return await this.repository.updateById(id, dto);
    } catch (error) {
      throw AppError.from(error as AppError, StatusCodes.BAD_REQUEST);
    }
  }

  async deleteById(id: string): Promise<boolean> {
    try {
      return await this.repository.deleteById(id);
    } catch (error) {
      throw AppError.from(error as AppError, StatusCodes.BAD_REQUEST);
    }
  }

  async findById(id: string): Promise<Supplier | null> {
    try {
      return await this.repository.findById(id);
    } catch (error) {
      throw AppError.from(error as AppError, StatusCodes.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Supplier[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      throw AppError.from(error as AppError, StatusCodes.BAD_REQUEST);
    }
  }

  async findByCond(cond: Partial<Supplier>): Promise<Supplier[]> {
    try {
      return await this.repository.findByCond(cond);
    } catch (error) {
      throw AppError.from(error as AppError, StatusCodes.BAD_REQUEST);
    }
  }
}
