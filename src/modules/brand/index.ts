import { Router } from "express";
import { Sequelize } from "sequelize";
import { BrandUseCase } from "./usecase";
import { BrandRepository } from "./repository";
import { BrandHTTPService } from "./transport";
import { init, modelName } from "./repository/dto";

export const setupBrand = (sequelize: Sequelize) => {
  init(sequelize);

  const repository = new BrandRepository(sequelize, modelName);
  const useCase = new BrandUseCase(repository);
  const httpService = new BrandHTTPService(useCase);

  const router = Router();

  const brandRouter = Router();

  brandRouter.get("/", httpService.getAll.bind(httpService));
  brandRouter.get("/search", httpService.search.bind(httpService));
  brandRouter.get("/:id", httpService.getById.bind(httpService));
  brandRouter.post("/", httpService.create.bind(httpService));
  brandRouter.put("/:id", httpService.update.bind(httpService));
  brandRouter.delete("/:id", httpService.delete.bind(httpService));

  router.use("/brand", brandRouter);

  return router;
};
