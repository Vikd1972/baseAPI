import { AppDataSource } from "./data-source";
import User from "./entity/User";

export const usersRepo = AppDataSource.getRepository(User);
