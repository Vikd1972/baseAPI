import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { booksRepo, genreRepo } from "../../db";

const getBooks: Handler = async (req, res, next) => {
  try {
    const genres = req.body.genres;
    let currentPage = req.body.currentPage;
    const pagination = req.body.pagination;

    const quantityBooks = await booksRepo.count();
    const quantityPages = Math.ceil(quantityBooks / pagination);
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > quantityPages) {
      currentPage = quantityPages;
    };
    const skip = (pagination * currentPage) - pagination;

    const serviceInfo = {
      quantityBooks: quantityBooks,
      quantityPages: quantityPages,
      activePage: currentPage,
      prevPage: currentPage == 1 ? 1 : currentPage - 1,
      nextPage: currentPage == quantityPages ? currentPage : currentPage + 1,
      booksPerPage: pagination,
    };
    if (genres.length != 0) {

    }
    //.where("id IN (:...ids)", { ids: randomBooks })
    const books = await booksRepo.find({
      relations: {
        genres: true
      },
      skip: skip,
      take: pagination,
    });

    books.forEach((item) => {
      item.hardcoverPrice = item.hardcoverPrice / 100;
      item.paperbackPrice = item.paperbackPrice / 100;
    })

    return res.status(StatusCodes.OK).json({
      serviceInfo,
      books
    });


  } catch (err) {
    next(err)
  };
};

export default getBooks;