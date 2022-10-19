import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { booksRepo } from "../../db";

const getDetailBook: Handler = async (req, res, next) => {
  try {
    const activePage = req.body.activePage;
    const id = req.body.id;    

    const book = await booksRepo.findOneBy({
      id: id,
    });

    if (book) {
      book.hardcoverPrice = book.hardcoverPrice / 100;
      book.paperbackPrice = book.paperbackPrice / 100;
    }   

    return res.status(StatusCodes.OK).json({
      book
    });

  } catch (err) {
    next(err)
  };
};

export default getDetailBook;