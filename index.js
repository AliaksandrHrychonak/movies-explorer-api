require('dotenv').config();

const { PORT, BITFILMSDB } = process.env;
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json);
app.use(express.urlencoded({ extended: true }));

const startServer = async () => {
  try {
    await mongoose.connect(BITFILMSDB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    app.listen(PORT, () => console.log(`Server start on http://localhost:${PORT}/`));
  } catch (e) {
    console.log(e);
  }
};
startServer();
