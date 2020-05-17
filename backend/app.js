const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts')

const app = express();

mongoose.connect('mongodb+srv://root:82Q8Nfr39b0kDIxs@cluster0-h9r8p.mongodb.net/node-angular?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connection success');
  })
  .catch(() => {
    console.log('Connection error');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); // optional

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use('/api/posts', postsRoutes);


module.exports = app;
