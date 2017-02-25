const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

// DB connection
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/muber');
}

// Middlewares
app.use(bodyParser.json());

// Routes
routes(app);

app.use((err, req, res, next) => {
  res.status(422)
    .send({ error: err.message });
});

module.exports = app;
