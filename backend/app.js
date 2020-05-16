const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then(docs => {
    res.status(200).json({
      message: 'Post fetched successfully',
      posts: docs
    });
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id})
    .then(result => {
      res.status(200).json({ message: 'Post deleted successfully'});
    });
});

module.exports = app;
