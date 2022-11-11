import express from 'express';

import getBooks from '../controllers/books/getAllBooks';
import getDetailBook from '../controllers/books/getOneBook';
import getRandomBooks from '../controllers/books/getRandomBooks';

const booksRoute = express.Router();

booksRoute.post('/detail', getDetailBook);
booksRoute.get('/random', getRandomBooks);
booksRoute.get('/', getBooks);

export default booksRoute;
