import { DataTypes, Model, Sequelize } from "sequelize";
import { date } from "zod";

export class BrandPersistence extends Model {}

export const modelName = "Categories";

export function init(sequelize: Sequelize) {
  BrandPersistence.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: modelName,
      timestamps: true,
      underscored: true,
      tableName: "Categories",
    }
  );
}