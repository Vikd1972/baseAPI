import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { booksRepo } from "../../db";

const getFavoritesBooks: Handler = async (req, res, next) => {
  try {    

    const favoritesBooks = req.body.favorites;

    const books = await booksRepo
      .createQueryBuilder()
      .where("id IN (:...ids)", { ids: favoritesBooks })
      .getMany();
    
    books.forEach((item) => {
      item.hardcoverPrice = item.hardcoverPrice / 100;
      item.paperbackPrice = item.paperbackPrice / 100;
    })

    return res.status(StatusCodes.OK).json({
      books
    });
    
  } catch (err) {
    next(err)
  };
};

export default getFavoritesBooks;