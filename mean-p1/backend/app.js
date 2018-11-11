const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');
const config = require('./../config');

const app = express();
mongoose.connect(config.mongodb_connString)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(() => {
    console.log('MongoDB connection failed');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req,res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, DELETE, PATCH');
  next();
});

// app.use((req, res, next) => {
//   next();
// });

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();

  console.log(post);
  res.status(201).json({
    message: 'Received successfully.'
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: 'Success on send',
      posts: documents
    });
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message:'The record is deleted'});
  });
});
module.exports = app;
