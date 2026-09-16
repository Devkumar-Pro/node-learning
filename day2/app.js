const express = require('express');

const routes = require('./routes');
const loggerMiddleware = require('./middleware/logger.middleware');
const notFoundMiddleware = require('./middleware/notFound.middleware');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

app.use(express.json());

app.use(loggerMiddleware);

app.use(routes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;