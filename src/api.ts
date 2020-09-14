import cors from 'cors';
import express from 'express';
import { createServer as createHTTPServer } from 'http';
import swaggerUI from 'swagger-ui-express';

import apiRouter from './routers/api';
import config from './config/config';
import { errorAdapterMiddleware, errorLoggingMiddleware } from './middlewares/error';

const app = express();
app.use(cors());
app.use(express.json({ limit: '1MB' }));
app.use(express.static('public'));

const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(apiRouter);

// Middlewares
app.use(errorLoggingMiddleware);
app.use(errorAdapterMiddleware);

console.log(`API is running on port:${config.apiPort}`);
createHTTPServer(app).listen(config.apiPort);
