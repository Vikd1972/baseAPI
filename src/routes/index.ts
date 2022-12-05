import express from 'express';

import booksRoute from '../routes/booksRoute';
import favoritesRoute from '../routes/favoritesRoute';
import cartRoute from '../routes/cartRoute';
import usersRoute from '../routes/usersRoute';
import authRoute from '../routes/authRoute';
import ratingRoute from '../routes/ratingRoute';
import commentsRoute from '../routes/commentsRoute';

const indexRoutes = express();

indexRoutes.use('/books', booksRoute);
indexRoutes.use('/favorites', favoritesRoute);
indexRoutes.use('/cart', cartRoute);
indexRoutes.use('/users', usersRoute);
indexRoutes.use('/auth', authRoute);
indexRoutes.use('/rating', ratingRoute);
indexRoutes.use('/comments', commentsRoute);

export default indexRoutes;
