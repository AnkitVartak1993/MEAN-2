const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req,res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, DELETE, PATCH');
  next();
})
app.use((req, res, next) => {
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Received successfully.'
  });
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {title:'node',content:'node data', id: 'asdfghj'},
    {title:'node2',content:'node data2', id: 'hgfdsa'},
  ];
  res.status(200).json({
    message: 'Success on send',
    posts: posts
  });
});
module.exports = app;
