import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { booksRepo } from "../../db";

const getDetailBook: Handler = async (req, res, next) => {
  try {
    const id = req.body.id;

    const quantityBooks = await booksRepo.count()

    const book = await booksRepo.findOneBy({
      id: id,
    });

    return res.status(StatusCodes.OK).json({
      quantityBooks,
      book
    });

  } catch (err) {
    next(err)
  };
};

export default getDetailBook;