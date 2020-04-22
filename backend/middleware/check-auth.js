const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret_for_me_on_server");
    next();
  }catch (error) {
    res.status(401).json({message:"Access Denied"})
  }
};
