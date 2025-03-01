import { Router } from "express";
import { Sequelize } from "sequelize";
import { UserUseCase } from "./usecase";
import { UserRepository } from "./repository";
import { UserHTTPService } from "./transport";
import { init, modelName } from "./repository/dto";

export const setupUser = (sequelize: Sequelize) => {
  init(sequelize);

  const repository = new UserRepository(sequelize, modelName);
  const useCase = new UserUseCase(repository);
  const httpService = new UserHTTPService(useCase);

  const router = Router();

  router.post("/register", httpService.register.bind(httpService));
  router.post("/authenticate", httpService.login.bind(httpService));
  // router.get("/profile", httpService.profile.bind(httpService));

  return router;
};
