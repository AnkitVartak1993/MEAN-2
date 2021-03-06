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
  res.setHeader('Access-Control-Allow-Methods','GET, POST, DELETE, PATCH, PUT');
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

  post.save().then((createdPost) => {
    res.status(201).json({
      message:'blog saved successfully',
      postId: createdPost._id
    });
  });
});

app.put('/api/posts/:id',(req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}).then((result) => {
    res.status(200).json({message:'Update success'});
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

app.get('/api/posts/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if(post) {
      res.status(200).json(post);
    } else {
      res.status(400).json({message:'Post not found'});
    }
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message:'The record is deleted'});
  });
});
module.exports = app;
