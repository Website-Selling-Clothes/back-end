import { Brand } from "../model";

export interface IBrandQueryRepo {
    get(id: string): Promise<Brand | null>; 
    getAll(): Promise<Brand[]>;
    search(keyword: string): Promise<Brand[]>;
    listByIds(ids: string): Promise<Brand[]>;
    findByCond(cond: any): Promise<Brand | null>;
}

export interface IBrandCommandRepo {
    create(data: Brand): Promise<boolean>;
    update(id: string, data: Partial<Brand>): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}

export interface IBrandUseCase {
    getAll(): Promise<Brand[]>;
    search(keyword: string): Promise<Brand[]>;
    getById(id: string): Promise<Brand>;
    create(data: Brand): Promise<boolean>;
    update(id: string, data: Partial<Brand>): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}