import { Op, Sequelize } from "sequelize"; 
import { IBrandQueryRepo, IBrandCommandRepo } from "../interface";
import { Brand, BrandCondDTO } from "../model";

export class BrandRepository implements IBrandQueryRepo, IBrandCommandRepo {
    constructor(readonly sequelize: Sequelize, readonly modelName: string) {}

    async create(data: Brand): Promise<boolean> {
        await this.sequelize.models[this.modelName].create(data);
        return true;
    }

    async findByCond(cond: BrandCondDTO): Promise<Brand | null> {
        const brand = await this.sequelize.models[this.modelName].findOne({
          where: cond,
        });
        if (!brand) return null;
        
            //Convert to plain JS object
            const persistenceData = brand.get({ plain: true });
        
            return persistenceData as Brand;
    }

    get(id: string): Promise<Brand | null> {
        throw new Error("Method not implemented.");
    }
    
    listByIds(ids: string): Promise<Brand[]> {
        throw new Error("Method not implemented.");
    }
}