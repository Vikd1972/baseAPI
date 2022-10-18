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

    if (book) {
      book.hardcoverPrice = book.hardcoverPrice / 100;
      book.paperbackPrice = book.paperbackPrice / 100;
    }   

    return res.status(StatusCodes.OK).json({
      quantityBooks,
      book
    });

  } catch (err) {
    next(err)
  };
};

export default getDetailBook;