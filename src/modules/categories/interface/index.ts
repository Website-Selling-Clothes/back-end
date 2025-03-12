import { Categories } from "../model";

export interface ICategoriesQueryRepo {
    get(id: string): Promise<Categories | null>; 
    getAll(): Promise<Categories[]>;
    search(keyword: string): Promise<Categories[]>;
    listByIds(ids: string): Promise<Categories[]>;
    findByCond(cond: any): Promise<Categories | null>;
}

export interface ICategoriesCommandRepo {
    create(data: Categories): Promise<boolean>;
    update(id: string, data: Partial<Categories>): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}

export interface ICategoriesUseCase {
    getAll(): Promise<Categories[]>;
    search(keyword: string): Promise<Categories[]>;
    getById(id: string): Promise<Categories>;
    create(data: Categories): Promise<boolean>;
    update(id: string, data: Partial<Categories>): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}