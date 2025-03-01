import { Op, Sequelize } from "sequelize";
import { IUserCommandRepo, IUserQueryRepo } from "../interface";
import { User, UserCondDTO, UserRegistrationDTO } from "../model";

export class UserRepository implements IUserQueryRepo, IUserCommandRepo {
  constructor(readonly sequelize: Sequelize, readonly modelName: string) {}

  async create(data: User): Promise<boolean> {
    await this.sequelize.models[this.modelName].create(data);
    return true;
  }

  async findByCond(cond: UserCondDTO): Promise<User | null> {
    const user = await this.sequelize.models[this.modelName].findOne({
      where: cond,
    });

    if (!user) return null;

    //Convert to plain JS object
    const persistenceData = user.get({ plain: true });

    return persistenceData as User;
  }

  get(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  listByIds(ids: string): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}
