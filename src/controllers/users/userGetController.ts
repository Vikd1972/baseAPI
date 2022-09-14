import User from '../../db/entity/User'
import { AppDataSource } from '../../db/data-source';

export const user = async (req, res) => {
    const usersRepo = AppDataSource.getRepository(User);
    const users = await usersRepo.find();
    res.json({
        users: users.map((user) => ({
            id: user.id,
            name: user.fullname,
            email: user.email,
            dob: user.dob,
            isAdmin: user.isAdmin,
        })),
    });

  //res.send("List user");
};