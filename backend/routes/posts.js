const express = require("express");
const Post = require('../models/post');
const router = express.Router();
const multer = require('multer');


const MIME_TYPE_MAP = {
  // picture types
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  // ms word doc mime types
  'application/msword': 'doc',
  'application/x-abiword': 'abw',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',


};

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('invalid mime type on Server!!');
    if (isValid) {
      error = null;
    }
    cb(null, 'backend/uploads')
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);

  }
});

// /api/posts
router.post("", multer({storage: storage}).single('upload'), (req, res, next) => {
  // getting the server url
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    filePath: url + '/uploads/' + req.file.filename
  });
  post.save().then(createdPost => {
    // console.log(createdPost);
    res.status(201).json({
      message: "Post was created successfully!!",
      post: {
        // using spread operater to copy the created object
        ...createdPost,
        id: createdPost._id

        // id: createdPost._id,
        // title: createdPost.title,
        // content: createdPost.content,
        // filePath: createdPost.filePath
      }
    });
  });
});

// /api/posts/:id
router.put("/:id",
  multer({storage: storage}).single('upload'),
  (req, res, next) => {
    // console.log(req.file)
    let filePath = req.body.filePath;
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      filePath = url + '/uploads/' + req.file.filename;
    }

    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      filePath: filePath
    })
    console.log(post)
    Post.updateOne({_id: req.params.id}, post).then(result => {
      console.log(result);
      res.status(200).json({message: "Post Updated successfully!!"});
    });
  });

// /api/posts
router.get('', (req, res, next) => {
  //http://localhost:3000/api/posts?pagesize=2&page=1&something=cool
  console.log(req.query);

  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }

  postQuery.then(documents => {
    // console.log(documents);
    fetchedPosts = documents;
    return Post.count();
  }).then(count => {
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts: fetchedPosts,
      maxPosts: count
    });
  });
});

// /api/posts/:id
router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({message: 'Post Not Fond!!! :/ '});
    }
  });
});

// /api/posts/id
router.delete("/:id", (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Post deleted!'});
  });
});


module.exports = router;
