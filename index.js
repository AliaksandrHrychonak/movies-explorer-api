require('dotenv').config();

const { PORT, DB_URL } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const cookiesParser = require('cookie-parser');
const errorHandler = require('./middlewares/error-handler');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookiesParser());

app.use(routes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
    });
    app.listen(PORT, () => console.log(`Server start on http://localhost:${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
startServer();
