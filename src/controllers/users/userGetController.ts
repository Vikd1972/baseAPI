import { Handler } from 'express';

import { usersRepo } from "../../db";
import customError from '../../customError/customError';

const getUser: Handler = async (request, response, next) => {
    try {
        const users = await usersRepo.find();
        if (users.length === 0) {
            throw customError(404, 'users not found', 'users not found');
        }
        response.json({
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
      next(err)
    };
};

export default getUser;