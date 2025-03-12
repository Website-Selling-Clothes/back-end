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

  router.post("/brands", httpService.create.bind(httpService));
  router.get("/brands", httpService.getAll.bind(httpService));
  router.get("/brands/:id", httpService.getOne.bind(httpService));

  return router;
};
