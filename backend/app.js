const express = require('express');

const app = express();

app.use((req, res, next) => {

  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );

  next();
});


app.use('/api/posts',(req,res, next)=>{
  const posts = [
    {
    id:'hgvhjggvvbh',
    title:'first server side post',
    content: 'this is coming from the server'
  },
  {
    id:'gvkgjgkbhkjbhhbk',
    title:'first server side post',
    content: 'this is coming from the server'

  }
  ];


  res.status(200).json({
    message:'Posts fetched succesfully',
    Posts: posts
  });
});

module.exports = app;

