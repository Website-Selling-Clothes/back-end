import { Router } from "express";
import { Sequelize } from "sequelize";
// import { UserUseCase } from "./usecase";
import { BrandRepository } from "./repository";
// import { UserHTTPService } from "./transport";
import { init, modelName } from "./repository/dto";
export const setupBrand = (sequelize: Sequelize) => {
  init(sequelize);

  const repository = new BrandRepository(sequelize, modelName);
//   const useCase = new BrandUseCase(repository);
//   const httpService = new BrandHTTPService(useCase);

  const router = Router();

//   router.post("/register", httpService.register.bind(httpService));
//   router.post("/authenticate", httpService.login.bind(httpService));
  // router.get("/profile", httpService.profile.bind(httpService));

  return router;
};
