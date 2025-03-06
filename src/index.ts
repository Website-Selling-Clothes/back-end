import "module-alias/register";
import { sequelize } from "@share/component/sequelize";
import { config } from "dotenv";
import express, { Request, Response } from "express";
import { setupUser } from "@modules/user";
import { setupBrand } from "@modules/brand";

config();

(async () => {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");

  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());

  app.use("/v1", setupUser(sequelize));
  app.use("/v2", setupBrand(sequelize));

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})();
