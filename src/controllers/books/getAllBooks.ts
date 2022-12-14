/* eslint-disable @typescript-eslint/indent */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import config from '../../config';
import type Book from '../../db/entity/Book';
import type Genre from '../../db/entity/Genre';
import type Rating from '../../db/entity/Rating';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type RequestType = {
  pagination: number;
  currentPage: number;
};

type QueryType = {
  genres: string;
  price: string;
  sort: string;
  search: string;
  page: string;
};

type ServiceInfoType = {
  quantityBooks: number;
  quantityPages: number;
  activePage: number;
  prevPage: number;
  nextPage: number;
  booksPerPage: number;
};

type ResponseType = {
  books: Book[];
  genres: Genre[];
  serviceInfo: ServiceInfoType;
  rating: Rating[];
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, QueryType, BodyType>;

const getBooks: ControllerType = async (req, res, next) => {
  try {
    const { genres, price, sort, search, page } = req.query;
    let currentPage = Number(page) || 1;
    let currentGenres: number[] = [];
    if (genres) {
      currentGenres = genres.split(',').map((item: string | number) => {
        let elem = item;
        elem = Number(item);
        return elem;
      });
    }
    let minPrice = 0;
    let maxPrice = 10000;
    if (price) {
      minPrice = +price.split(',')[0];
      maxPrice = +price.split(',')[1];
    }

    const filteredBooks = db.books
      .createQueryBuilder('book');

    if (currentGenres.length !== 0) {
      filteredBooks.innerJoinAndSelect(
        'book.genres', 'genre', 'genre.id IN (:...ids)', { ids: currentGenres },
      );
    }

    if (search) {
      const searchTerm = `%${search}%`;
      filteredBooks.where(
        'book.name ILIKE :searchTerm OR book.author ILIKE :searchTerm',
        { searchTerm },
      );
    }

    if (minPrice > 0) {
      filteredBooks.where(
        'book.paperbackPrice >= :minPrice',
        { minPrice },
      );
    }

    if (maxPrice < 100) {
      filteredBooks.where(
        'book.paperbackPrice <= :maxPrice',
        { maxPrice },
      );
    }

    switch (sort) {
      case 'Price':
        filteredBooks.orderBy('book.paperbackPrice', 'ASC');
        break;
      case 'Name':
        filteredBooks.orderBy('book.name', 'ASC');
        break;
      case 'Author name':
        filteredBooks.orderBy('book.author', 'ASC');
        break;
      case 'Rating':
        filteredBooks.orderBy('book.averageRating', 'DESC');
        break;
      case 'Date of ussue':
        filteredBooks.orderBy('book.releasedAt', 'ASC');
        break;
      default:
    }

    const skip = (12 * currentPage) - 12;

    const filterBooks = await filteredBooks
      .take(12)
      .skip(skip)
      .getManyAndCount();

    const books = filterBooks[0].map((book) => {
      return {
        ...book,
        pathToCover: `${config.pathToCover}${book.pathToCover}`,
      };
    });

    const quantityBooks = filterBooks[1];
    const quantityPages = Math.ceil(quantityBooks / 12);
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > quantityPages) {
      currentPage = quantityPages;
    }

    const serviceInfo = {
      quantityBooks,
      quantityPages,
      activePage: currentPage,
      prevPage: currentPage === 1 ? 1 : currentPage - 1,
      nextPage: currentPage === quantityPages ? currentPage : currentPage + 1,
      booksPerPage: 12,
    };

    const allGenres = await db.genre.find();

    const rating = await db.rating.find();

    return res.status(StatusCodes.OK).json({
      books,
      serviceInfo,
      genres: allGenres,
      rating,
    });
  } catch (err) {
    next(err);
  }
};

export default getBooks;
