import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { usersRepo } from "../../db";
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

const getUser: Handler = async (request, response, next) => {
    try {
        const users = await usersRepo.find();
        if (users.length === 0) {
            throw customError(StatusCodes.NOT_FOUND, nameError.user_userNotFound, nameError.user_userNotFound);
        }
        response.status(200).json({users});
    } catch (err) {
      next(err)
    };
};

export default getUser;