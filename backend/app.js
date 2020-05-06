const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

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
app.use('/uploads', express.static(path.join(__dirname,'uploads')));
app.use('/', express.static(path.join(__dirname,'angular')));


app.use((req, res, next) => {

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");

  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );

  res.setHeader('Access-Control-Allow-Credentials', true);

  // app.use(cors());

  next();


});

// app.use(cors());

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
app.use((req,res,next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"))
});

module.exports = app;

