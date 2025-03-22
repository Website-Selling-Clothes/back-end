import { Supplier } from "../model";

export interface ISupplierCommandRepo {
  create(data: Supplier): Promise<boolean>;
  updateById(id: string, data: Partial<Supplier>): Promise<boolean>;
  deleteById(id: string): Promise<boolean>;
}

export interface ISupplierQueryRepo {
  findById(id: string): Promise<Supplier | null>;
  findAll(): Promise<Supplier[]>;
  findByCond(cond: Partial<Supplier>): Promise<Supplier[]>;
}

export interface ISupplierUseCase {
  create(data: Partial<Supplier>): Promise<string>;
  updateById(id: string, data: Partial<Supplier>): Promise<boolean>;
  deleteById(id: string): Promise<boolean>;
  findById(id: string): Promise<Supplier | null>;
  findAll(): Promise<Supplier[]>;
  findByCond(cond: Partial<Supplier>): Promise<Supplier[]>;
}