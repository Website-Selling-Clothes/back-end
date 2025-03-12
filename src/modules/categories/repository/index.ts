import { Sequelize } from "sequelize";
import { Categories } from "../model";
import { ICategoriesCommandRepo, ICategoriesQueryRepo } from "../interface";
import { Op } from "sequelize";

export class CategoriesRepository implements ICategoriesQueryRepo, ICategoriesCommandRepo {
    private sequelize: Sequelize;
    private model: string;

    constructor(sequelize: Sequelize, model: string) {
        this.sequelize = sequelize;
        this.model = model;
    }

    async get(id: string): Promise<Categories | null> {
        const result = await this.sequelize.model(this.model).findByPk(id);
        return result?.get({ plain: true }) || null;
    }

    async getAll(): Promise<Categories[]> {
        const results = await this.sequelize.model(this.model).findAll();
        return results.map(item => item.get({ plain: true }));
    }

    async search(keyword: string): Promise<Categories[]> {
        const results = await this.sequelize.model(this.model).findAll({
            where: {
                name: {
                    [Op.like]: `%${keyword}%`
                }
            }
        });
        return results.map(item => item.get({ plain: true }));
    }

    async listByIds(ids: string): Promise<Categories[]> {
        const results = await this.sequelize.model(this.model).findAll({
            where: {
                id: ids
            }
        });
        return results.map(item => item.get({ plain: true }));
    }

    async findByCond(cond: any): Promise<Categories | null> {
        const result = await this.sequelize.model(this.model).findOne({
            where: cond
        });
        return result?.get({ plain: true }) || null;
    }

    async create(data: Categories): Promise<boolean> {
        const result = await this.sequelize.model(this.model).create(data);
        return !!result;
    }

    async update(id: string, data: Partial<Categories>): Promise<boolean> {
        const result = await this.sequelize.model(this.model).update(data, {
            where: { id }
        });
        return result[0] > 0;
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.sequelize.model(this.model).destroy({
            where: { id }
        });
        return result > 0;
    }
}