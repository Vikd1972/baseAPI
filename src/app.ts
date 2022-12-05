import express from 'express';
import cors from 'cors';
import path from 'path';

import indexRoutes from './routes';
import customErrorHandler from './middleware/customErrorHandler';
import './types';

const app = express();

app.use(express.json({ limit: '50MB' }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../static')));

app.use('/api', indexRoutes);

app.use(customErrorHandler);

export default app;
