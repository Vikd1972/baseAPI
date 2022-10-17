import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { booksRepo } from "../../db";

const getRandomBook: Handler = async (req, res, next) => {
  try {
    const randomBooks = req.body.randomBooks;

    const books = await booksRepo
      .createQueryBuilder()
      .where("id IN (:...ids)", { ids: randomBooks })
      .getMany();

    return res.status(StatusCodes.OK).json({
      books
    });
    
  } catch (err) {
    next(err)
  };
};

export default getRandomBook;