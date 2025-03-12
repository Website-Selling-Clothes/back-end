import { Request, Response } from "express";
import { BrandUseCase } from "../usecase";

export class BrandHTTPService {
  private useCase: BrandUseCase;

  constructor(useCase: BrandUseCase) {
    this.useCase = useCase;
  }

  async create(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const brand = await this.useCase.create(name);
      return res.status(201).json(brand);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const brands = await this.useCase.findAll();
      return res.status(200).json(brands);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const brand = await this.useCase.findOne(Number(id));
      if (!brand) {
        return res.status(404).json({ error: "Brand not found" });
      }
      return res.status(200).json(brand);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
} 