import AppDataSource from "./data-source";
import User from "./entity/User";

const usersRepo = AppDataSource.getRepository(User);

export default usersRepo;
