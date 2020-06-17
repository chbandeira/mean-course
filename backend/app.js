const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const postsRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')

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
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);


module.exports = app;
