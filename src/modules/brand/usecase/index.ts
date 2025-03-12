import { IBrandUseCase} from "../interface";
import { BrandRepository } from "../repository";
import { Brand } from "../model";

export class BrandUseCase implements IBrandUseCase {
    private repository: BrandRepository;

    constructor(repository: BrandRepository) {
        this.repository = repository;
    }

    async getAll(): Promise<Brand[]> {
        return await this.repository.getAll();
    }

    async search(keyword: string): Promise<Brand[]> {
        return await this.repository.search(keyword);
    }

    async getById(id: string): Promise<Brand> {
        const brand = await this.repository.get(id);
        if (!brand) {
            throw new Error('Brand not found');
        }
        return brand;
    }

    async create(data: Brand): Promise<boolean> {
        return await this.repository.create(data);
    }

    async update(id: string, data: Partial<Brand>): Promise<boolean> {
        return await this.repository.update(id, data);
    }

    async delete(id: string): Promise<boolean> {
        return await this.repository.delete(id);
    }
}
