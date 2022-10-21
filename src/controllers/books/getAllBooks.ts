import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { booksRepo, genreRepo } from "../../db";
import Book from '../../db/entity/Book';
import Genre from '../../db/entity/Genre';

type RequestType = {
  currentGenres: number[];
  pagination: number;
  currentPage: number;
};

type ServiceInfoType = {
  quantityBooks: number,
  quantityPages: number,
  activePage: number,
  prevPage: number,
  nextPage: number,
  booksPerPage: number,
}

type ResponseType = {
  books: Book[];
  genres: Genre[]
  serviceInfo: ServiceInfoType;
};

type ControllerType = RequestHandler<RequestType, ResponseType>;

const getBooks: ControllerType = async (req, res, next) => {
  try {
    const { currentGenres, pagination } = req.body;
    console.log('str1: ' + currentGenres);

    let currentPage = req.body.currentPage;

    const quantityBooks = await booksRepo.count();
    const quantityPages = Math.ceil(quantityBooks / pagination);
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > quantityPages) {
      currentPage = quantityPages;
    };
    const skip = (pagination * currentPage) - pagination;

    const filteredBooks = booksRepo.createQueryBuilder('book');
    if (currentGenres.length !== 0) {
      console.log('str2: ' + currentGenres);
      filteredBooks.innerJoinAndSelect('book.genres', 'genre', 'genre.id IN (:...ids)', {ids: currentGenres },);
      // console.log(filteredBooks);
      
    }

    const book = await filteredBooks
      .take(pagination)
      .skip(skip)
      .getMany();


    console.log('str3: ' + currentGenres);
    console.log(book);

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

    const serviceInfo = {
      quantityBooks: quantityBooks,
      quantityPages: quantityPages,
      activePage: currentPage,
      prevPage: currentPage == 1 ? 1 : currentPage - 1,
      nextPage: currentPage == quantityPages ? currentPage : currentPage + 1,
      booksPerPage: pagination,
    };

    const genres = await genreRepo.find()

    return res.status(StatusCodes.OK).json({
      genres,
      serviceInfo,
      books
    });

  } catch (err) {
    next(err)
  };
};

export default getBooks;