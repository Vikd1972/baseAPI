require('express-async-errors');
import { Handler } from 'express';

import { usersRepo } from "../../db";

const deleteUser: Handler = async (request, response) => {
  try {
    const email = request.body.email

    const userToDelete = await usersRepo.findOneBy({
      email: email,
    });
    await usersRepo.remove(userToDelete);

    response.send('delete user')
  } catch (err) {
    console.log(err)
  };
};

export default deleteUser;