import { Request, Response, NextFunction } from "express";
import { SupplierUseCase } from "../usecase";


export class SupplierHTTPService {
  constructor(private readonly usecase: SupplierUseCase) {}

  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const supplierId = await this.usecase.create(data);
      res.status(201).json({ supplierId });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;
  
      if (!id) {
        res.status(400).json({ message: "Supplier ID is required" });
        return;
      }
  
      const updated = await this.usecase.updateById(id, data);
      if (!updated) {
        res.status(404).json({ message: "Supplier not found" });
        return;
      }
  
      res.status(200).json({ message: "Supplier updated successfully" });
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
  
      if (!id) {
        res.status(400).json({ message: "Supplier ID is required" });
        return;
      }
  
      const deleted = await this.usecase.deleteById(id);
      if (!deleted) {
        res.status(404).json({ message: "Supplier not found" });
        return;
      }
  
      res.status(200).json({ message: "Supplier deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
  
      if (!id) {
        res.status(400).json({ message: "Supplier ID is required" });
        return;
      }
  
      const supplier = await this.usecase.findById(id);
      if (!supplier) {
        res.status(404).json({ message: "Supplier not found" });
        return;
      }
  
      res.status(200).json(supplier);
    } catch (error) {
      next(error); // Chuyển lỗi đến middleware xử lý lỗi
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const suppliers = await this.usecase.findAll();
      res.status(200).json(suppliers);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async findByCond(req: Request, res: Response) {
    try {
      const cond = req.query;
      const suppliers = await this.usecase.findByCond(cond);
      res.status(200).json(suppliers);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}
