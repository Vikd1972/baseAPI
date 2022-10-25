import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { booksRepo, usersRepo } from "../../db";

const addToFavorites: Handler = async (req, res, next) => {
  try {
    const { userId, bookId } = req.body;

    const user = await usersRepo.findOne({
      where: {
        id: userId
      }
    });

    const book = await booksRepo.findOne({
      where: {
        id: bookId
      }
    });

    if (book && user) {
      const bookIndex = user.favorites.findIndex((item) => bookId === item.id)
      
      if (bookIndex !== -1) {
        user.favorites.splice(bookIndex, 1)
        await usersRepo.save(user);        
      } else {
        user.favorites.push(book)
        await usersRepo.save(user);
      }
    }

    const newUser = await usersRepo.findOne({
      where: {
        id: userId,
      }
    })

    return res.status(StatusCodes.OK).json({
      newUser
    });

  } catch (err) {
    next(err)
  };
};

export default addToFavorites;