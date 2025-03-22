import { Router } from "express";
import { Sequelize } from "sequelize";
import { SupplierUseCase } from "./usecase";
import { SupplierRepository } from "./repository";
import { SupplierHTTPService } from "./transport";
import { init, modelName } from "./repository/dto";

export const setupSupplier = (sequelize: Sequelize) => {
  init(sequelize);

  const repository = new SupplierRepository(sequelize, modelName);
  const useCase = new SupplierUseCase(repository);
  const httpService = new SupplierHTTPService(useCase);

  const router = Router();

  router.get("/", httpService.findAll.bind(httpService));
  router.get("/search", httpService.findByCond.bind(httpService));
  router.get("/:id", httpService.findById.bind(httpService));
  
  router.post("/", httpService.create.bind(httpService));
  router.put("/:id", httpService.update.bind(httpService));
  router.delete("/:id", httpService.delete.bind(httpService));

  return router;
};
