import express from 'express';

import applyValidationScheme from '../middleware/applyValidationScheme';
import schemaQueryString from '../validation/schemaQueryString';
import schemaGetDetailBook from '../validation/schemaGetDetailBook';
import getBooks from '../controllers/books/getAllBooks';
import getDetailBook from '../controllers/books/getOneBook';
import getRandomBooks from '../controllers/books/getRandomBooks';

const booksRoute = express.Router();

booksRoute.get('/detail', applyValidationScheme(schemaGetDetailBook), getDetailBook);
booksRoute.get('/random', getRandomBooks);
booksRoute.get('/', applyValidationScheme(schemaQueryString), getBooks);

export default booksRoute;
