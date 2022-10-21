import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { booksRepo } from "../../db";

const getRandomBooks: Handler = async (req, res, next) => {
  try {    
    const quantityBooks = await booksRepo.count()
    
    const randomBooks: number[] = []
    for (let i = 0; i <= 3; i++) {
      randomBooks.push(Math.ceil(Math.random() * quantityBooks));
    }

    const books = await booksRepo
      .createQueryBuilder()
      .where("id IN (:...ids)", { ids: randomBooks })
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

export default getRandomBooks;