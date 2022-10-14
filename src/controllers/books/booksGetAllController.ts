import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { booksRepo } from "../../db";

const getBooks: Handler = async (req, res, next) => {
  try {    
    const skip = req.body.skip;

    const quantityBooks = await booksRepo.count()

    const books = await booksRepo.find({
      skip: skip,
      take: 12,
    });

    return res.status(StatusCodes.OK).json({
      quantityBooks,
      books
    });


  } catch (err) {
    next(err)
  };
};

export default getBooks;