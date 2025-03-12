import { RequestHandler } from "express";
import { BrandUseCase } from "../usecase";

export class BrandHTTPService {
    constructor(private useCase: BrandUseCase) {}

    getAll: RequestHandler = async (req, res) => {
        try {
            const brands = await this.useCase.getAll();
            res.json(brands);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    };

    search: RequestHandler = async (req, res) => {
        try {
            const { keyword } = req.query;
            if (!keyword || typeof keyword !== 'string') {
                res.status(400).json({ error: "Keyword is required" });
                return;
            }
            const brands = await this.useCase.search(keyword);
            res.json(brands);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    };

    getById: RequestHandler = async (req, res) => {
        try {
            const { id } = req.params;
            const brand = await this.useCase.getById(id);
            res.json(brand);
        } catch (error) {
            if (error instanceof Error && error.message === 'Brand not found') {
                res.status(404).json({ error: "Brand not found" });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    };

    create: RequestHandler = async (req, res) => {
        try {
            const result = await this.useCase.create(req.body);
            if (result) {
                res.status(201).json({ message: "Brand created successfully" });
            } else {
                res.status(400).json({ error: "Failed to create brand" });
            }
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    };

    update: RequestHandler = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.useCase.update(id, req.body);
            if (result) {
                res.json({ message: "Brand updated successfully" });
            } else {
                res.status(404).json({ error: "Brand not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    };

    delete: RequestHandler = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.useCase.delete(id);
            if (result) {
                res.json({ message: "Brand deleted successfully" });
            } else {
                res.status(404).json({ error: "Brand not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    };
} 