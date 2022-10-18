import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { booksRepo } from "../../db";

const getBooks: Handler = async (req, res, next) => {
  try {
    const { skip, pagination } = req.body;

    const quantityBooks = await booksRepo.count()

    let books = await booksRepo.find({
      skip: skip,
      take: pagination,
    });

    books.forEach((item) => {
      item.hardcoverPrice = item.hardcoverPrice / 100;
      item.paperbackPrice = item.paperbackPrice / 100;
    })

    return res.status(StatusCodes.OK).json({
      quantityBooks,
      books
    });


  } catch (err) {
    next(err)
  };
};

export default getBooks;