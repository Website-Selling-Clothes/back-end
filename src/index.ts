import "module-alias/register";
import { sequelize } from "@share/component/sequelize";
import { config } from "dotenv";
import express, { Request, Response } from "express";
import { setupUser } from "@modules/user";
import { setupBrand } from "@modules/brand";

config();

(async () => {
  //Kết nối CSDL và khởi động server
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");

  // Cấu hình và chạy Express
  const app = express();
  const port = process.env.PORT || 3000;
  app.use(express.json());

  //Định nghĩa các router cho API
  app.use("/v1", setupUser(sequelize));
  app.use("/v2", setupBrand(sequelize));

  //Chạy server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

})();
