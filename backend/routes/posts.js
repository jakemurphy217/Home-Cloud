const express = require("express");
const Post = require('../models/post');
const router = express.Router();
const multer = require('multer');


const MIME_TYPE_MAP = {
  // picture types
  'image/png' : 'png',
  'image/jpeg': 'jpg',
  'image/jpg' : 'jpg',
  // ms word doc mime types
  'application/msword':'doc',
  'application/x-abiword':'abw',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':'docx',


};

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('invalid mime type on Server!!');
    if (isValid){
      error = null;
    }
    cb(null, 'backend/uploads')
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});

// /api/posts
router.post("", multer({storage: storage}).single('upload'), (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    // console.log(createdPost);
    res.status(201).json({
      message:"Post was created successfully!!",
      postId: createdPost._id
    });
  });
});

// /api/posts/:id
router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id: req.params.id}, post ).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post Updated successfully!!"});
  });
});

// /api/posts
router.get('', (req, res, next) => {
  Post.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: 'Posts fetched succesfully',
      posts: documents
    });
  });
});

// /api/posts/:id
router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post){
      res.status(200).json(post)
    }else {
      res.status(404).json({message: 'Post Not Fond!!! :/ '});
    }
  });
});

// /api/posts/id
router.delete("/:id", (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Post deleted!'});
  });
});


module.exports = router;
