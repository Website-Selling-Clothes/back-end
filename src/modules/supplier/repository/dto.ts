import { DataTypes, Model, Sequelize } from "sequelize";
import { Gender, Status, UserRole } from "@share/model/base-model";

export class SupplierPersistence extends Model {}

export const modelName = "Supplier";

export function init(sequelize: Sequelize) {
  SupplierPersistence.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: false, unique: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      status: { type: DataTypes.STRING, allowNull: false, defaultValue: Status.ACTIVE },
    },
    {
      sequelize,
      modelName: modelName,
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "suppliers",
    }
  );
}
