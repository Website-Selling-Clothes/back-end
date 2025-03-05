import { DataTypes, Model, Sequelize } from "sequelize";
import { date } from "zod";

export class BrandPersistence extends Model {}

export const modelName = "Brand";

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
      mail :{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      updateAt :{
        type: DataTypes.DATE,
        allowNull: true,
        field: "update_at",
      },
    },
    {
      sequelize,
      modelName: modelName,
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "Brand",
    }
  );
}
