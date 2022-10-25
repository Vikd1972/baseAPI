import express from 'express';
import cors from 'cors';
import path from 'path';

import booksRoute from './routes/booksRoute';
import usersRoute from './routes/usersRoute';
import authRoute from './routes/authRoute';
import uploadRoute from './routes/uploadRoute';
import cartRoute from './routes/cartRoute';
import customErrorHandler from './middleware/customErrorHandler';

const app = express();

app.use(express.json({ limit: '50MB' }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../static')));

app.use('/api/books', booksRoute);
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
app.use('/api/cart', cartRoute);
app.use('/api/upload', uploadRoute);

app.use(customErrorHandler);

export default app;
