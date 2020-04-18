const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
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
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;

