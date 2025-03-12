import { ICategoriesUseCase} from "../interface";
import { CategoriesRepository } from "../repository";
import { Categories } from "../model";

export class CategoriesUseCase implements ICategoriesUseCase {
    private repository: CategoriesRepository;

    constructor(repository: CategoriesRepository) {
        this.repository = repository;
    }

    async getAll(): Promise<Categories[]> {
        return await this.repository.getAll();
    }

    async search(keyword: string): Promise<Categories[]> {
        return await this.repository.search(keyword);
    }

    async getById(id: string): Promise<Categories> {
        const Categories = await this.repository.get(id);
        if (!Categories) {
            throw new Error('Categories not found');
        }
        return Categories;
    }

    async create(data: Categories): Promise<boolean> {
        return await this.repository.create(data);
    }

    async update(id: string, data: Partial<Categories>): Promise<boolean> {
        return await this.repository.update(id, data);
    }

    async delete(id: string): Promise<boolean> {
        return await this.repository.delete(id);
    }
}