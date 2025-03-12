import { RequestHandler } from "express";
import { CategoriesUseCase } from "../usecase";

export class CategoriesHTTPService {
    constructor(private useCase: CategoriesUseCase) {}

    getAll: RequestHandler = async (req, res) => {
        try {
            const Categoriess = await this.useCase.getAll();
            res.json(Categoriess);
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
            const Categories = await this.useCase.search(keyword);
            res.json(Categories);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    };

    getById: RequestHandler = async (req, res) => {
        try {
            const { id } = req.params;
            const Categories = await this.useCase.getById(id);
            res.json(Categories);
        } catch (error) {
            if (error instanceof Error && error.message === 'Categories not found') {
                res.status(404).json({ error: "Categories not found" });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    };

    create: RequestHandler = async (req, res) => {
        try {
            const result = await this.useCase.create(req.body);
            if (result) {
                res.status(201).json({ message: "Categories created successfully" });
            } else {
                res.status(400).json({ error: "Failed to create Categories" });
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
                res.json({ message: "Categories updated successfully" });
            } else {
                res.status(404).json({ error: "Categories not found" });
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
                res.json({ message: "Categories deleted successfully" });
            } else {
                res.status(404).json({ error: "Categories not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    };
} 