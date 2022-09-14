import User from '../src/entity/User'
import { AppDataSource } from '../src/data-source';

export const user = async (req, res) => {
    const usersRepo = AppDataSource.getRepository(User);
    const users = await usersRepo.find();
    res.json({
        users: users.map((user) => ({
            id: user.id,
            name: user.fullname,
            email: user.email,
            dob: user.dob,
        })),
    });

  //res.send("List user");
};