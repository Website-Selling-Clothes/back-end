import { Router } from "express";
import { Sequelize } from "sequelize";
import { CategoriesUseCase } from "./usecase";
import { CategoriesRepository } from "./repository";
import { CategoriesHTTPService } from "./transport";
import { init, modelName } from "./repository/dto";

export const setupCategories = (sequelize: Sequelize) => {
  init(sequelize);

  const repository = new CategoriesRepository(sequelize, modelName);
  const useCase = new CategoriesUseCase(repository);
  const httpService = new CategoriesHTTPService(useCase);

  const router = Router();

  const CategoriesRouter = Router();

  CategoriesRouter.get("/", httpService.getAll.bind(httpService));
  CategoriesRouter.get("/search", httpService.search.bind(httpService));
  CategoriesRouter.get("/:id", httpService.getById.bind(httpService));
  CategoriesRouter.post("/", httpService.create.bind(httpService));
  CategoriesRouter.put("/:id", httpService.update.bind(httpService));
  CategoriesRouter.delete("/:id", httpService.delete.bind(httpService));

  router.use("/Categories", CategoriesRouter);

  return router;
};