import { Handler } from 'express';

import { usersRepo } from "../../db";
import CustomError from '../../errorHandler/customError';

 const getUser: Handler = async (req, res) => {
    try {
        const users = await usersRepo.find();
        res.json({
            users: users.map((user) => ({
                id: user.id,
                name: user.fullname,
                email: user.email,
                dob: user.dob,
                isAdmin: user.isAdmin,
                hash: user.hash,
            })),
        });
    } catch (err) {
        // if (err instanceof CustomError) {
        //   response.status().json({message})
        // }

        console.log(err)
    };

  //res.send("List user");
};

export default getUser;