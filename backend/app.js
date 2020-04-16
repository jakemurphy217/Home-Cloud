const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');
const app = express();

const url = 'mongodb://127.0.0.1:27017/Home-Cloud-Project'
const db = mongoose.connection;

//local mongoose connection to DB
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
db.once('open', _ => {
  console.log('Database Connected:', url)
});

db.on('error', err => {
  console.error('Connection Error', err)
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );

  next();
});

app.post("/api/posts", (req, res, next) => {

  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully!!'
  });

});

app.get('/api/posts', (req, res, next) => {
  // const posts = [
  //   {
  //   id:'hgvhjggvvbh',
  //   title:'first server side post',
  //   content: 'this is coming from the server'
  // },
  // {
  //   id:'gvkgjgkbhkjbhhbk',
  //   title:'first server side post',
  //   content: 'this is coming from the server'
  //
  // }
  // ];

  Post.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: 'Posts fetched succesfully',
      posts: documents
    });
  });


});

app.delete("/api/posts/:id", (req, res, next) => {
  console.log(req.params.id);

  Post.deleteOne({ _id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Post deleted!'
    });
  });

});

module.exports = app;

