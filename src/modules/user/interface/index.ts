import { User, UserLoginDTO, UserRegistrationDTO } from "../model";

export interface IUserQueryRepo {
  get(id: string): Promise<User | null>; 
  listByIds(ids: string): Promise<User[]>;
  findByCond(cond: any): Promise<User | null>;
}

export interface IUserCommandRepo {
  create(data: User): Promise<boolean>; //TODO: define data type
  // updateUser(data: any): Promise<any>;
  // deleteUser(id: string): Promise<any>;
}

export interface IUserUseCase {
  login(data: UserLoginDTO): Promise<string>;
  register(data: UserRegistrationDTO): Promise<string>;
  profile(userId: string): Promise<User>;
  // verifyToken(token: string): Promise<TokenPayload>;
}
