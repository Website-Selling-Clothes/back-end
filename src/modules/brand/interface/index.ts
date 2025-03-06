import { Brand } from "../model";

export interface IBrandQueryRepo {
    get(id: string): Promise<Brand | null>; 
    listByIds(ids: string): Promise<Brand[]>;
    findByCond(cond: any): Promise<Brand | null>;
}

export interface IBrandCommandRepo {
    create(data: Brand): Promise<boolean>;
}

export interface IBrandUseCase {
    profile(brandId: string): Promise<Brand>;
}