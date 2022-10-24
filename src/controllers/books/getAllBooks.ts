import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { booksRepo, genreRepo } from "../../db";
import Book from '../../db/entity/Book';
import Genre from '../../db/entity/Genre';

type RequestType = {
  currentGenres: QueryOptionsType;
  pagination: number;
  currentPage: number;
};

type QueryOptionsType = {
  currentGenres: number[],
  price: number[],
  sort: string,
  searhText: string
}

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
    // console.log(req.body);

    // for (let i = 1; i <= 24; i++) {
      const book = await booksRepo.findOneBy({
        id: 22,
      });
      if (book) {
        book.hardcoverPrice = 599;
        book.paperbackPrice = 399;
        await booksRepo.save(book)
      }

    // }


    const { queryOptions, pagination } = req.body;
    const minPrice: number = queryOptions.price[0] * 100;
    const maxPrice: number = queryOptions.price[1] * 100;
    const sort: string = queryOptions.sort;
    const searchText: string = queryOptions.searchText;
    
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
    const currentGenres = queryOptions.currentGenres

    if (queryOptions.currentGenres.length !== 0) {
      filteredBooks.innerJoinAndSelect(
        'book.genres', 'genre', 'genre.id IN (:...ids)',
        { ids: currentGenres },);
    }

    if (searchText.length > 0) {
      const searchTerm = `%${searchText}%`
      filteredBooks.where(
        'book.name ILIKE :searchTerm OR book.author ILIKE :searchTerm',
        { searchTerm });
    }

    if (minPrice > 0) {
      filteredBooks.where(
        'book.paperbackPrice >= :minPrice OR book.hardcoverPrice >= :minPrice',
        { minPrice });
    }

    if (maxPrice < 10000) {
      filteredBooks.where(
        'book.paperbackPrice <= :maxPrice OR book.hardcoverPrice <= :maxPrice',
        { maxPrice });
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
        filteredBooks.orderBy('book.name', 'ASC');
        break;
      case 'Date of ussue':
        filteredBooks.orderBy('book.releasedAt', 'ASC');
        break;
    }

    const books = await filteredBooks
      .take(pagination)
      .skip(skip)
      .getMany();

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
      books,
      serviceInfo,
      genres,
    });

  } catch (err) {
    next(err)
  };
};

export default getBooks;