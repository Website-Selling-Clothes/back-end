import { Op, Sequelize } from "sequelize";
import { Supplier } from "../model";
import { ISupplierCommandRepo, ISupplierQueryRepo } from "../interface";

export class SupplierRepository implements ISupplierQueryRepo, ISupplierCommandRepo {
  constructor(private readonly sequelize: Sequelize, private readonly modelName: string) {}

  async create(data: Supplier): Promise<boolean> {
    await this.sequelize.models[this.modelName].create(data);
    return true;
  }

  async findById(id: string): Promise<Supplier | null> {
    const supplier = await this.sequelize.models[this.modelName].findByPk(id);
    return supplier ? (supplier.get({ plain: true }) as Supplier) : null;
  }

  async findAll(): Promise<Supplier[]> {
    const suppliers = await this.sequelize.models[this.modelName].findAll();
    return suppliers.map((supplier) => supplier.get({ plain: true }) as Supplier);
  }

  async findByCond(cond: Partial<Supplier>): Promise<Supplier[]> {
    const suppliers = await this.sequelize.models[this.modelName].findAll({ where: cond });
    return suppliers.map((supplier) => supplier.get({ plain: true }) as Supplier);
  }

  async updateById(id: string, data: Partial<Supplier>): Promise<boolean> {
    const [updatedRows] = await this.sequelize.models[this.modelName].update(data, {
      where: { id },
    });
    return updatedRows > 0;
  }

  async deleteById(id: string): Promise<boolean> {
    const deletedRows = await this.sequelize.models[this.modelName].destroy({ where: { id } });
    return deletedRows > 0;
  }
}
