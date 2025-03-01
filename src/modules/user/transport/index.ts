import { Request, Response } from "express";
import { UserUseCase } from "../usecase";
export class UserHTTPService {
  constructor(private readonly usecase: UserUseCase) {}

  async register(req: Request, res: Response) {
    try {
      console.log("====> register");
      const data = req.body;
      const userId = await this.usecase.register(data);
      res.status(201).json({ userId });
    } catch (error) {
      res.status(400).json({
        message: (error as Error).message,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const data = req.body;
      const token = await this.usecase.login(data);
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({
        message: (error as Error).message,
      });
    }
  }
}
