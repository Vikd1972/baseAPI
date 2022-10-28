import express from 'express';
import cors from 'cors';
import path from 'path';

import booksRoute from './routes/booksRoute';
import cartRoute from './routes/cartRoute';
import favoritesRoute from './routes/favoritesRoute';
import usersRoute from './routes/usersRoute';
import authRoute from './routes/authRoute';
import customErrorHandler from './middleware/customErrorHandler';

const app = express();

app.use(express.json({ limit: '50MB' }));
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.static(path.join(__dirname, '../static')));

app.use('/api/books', booksRoute);
app.use('/api/favorites', favoritesRoute);
app.use('/api/cart', cartRoute);
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);

app.use(customErrorHandler);

export default app;