const jwt = require('jsonwebtoken');
require('dotenv').config();

const authJWT = {};

authJWT.authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];
  try {
    //need to verify
    const decoded = jwt.decode(token);
    const email = decoded.email;
    const firstname = decoded.given_name;
    const lastname = decoded.family_name;
    const newUser = { email, firstname, lastname };
    req.user = newUser;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

authJWT.userSpecificAuth = async (req, res, next) => {
  console.log('inside userspecificauth');
  const token = req.params.token;
  console.log(token);
  try {
    jwt.verify(token, process.env.SECRET_SIGNATURE, function (err, decoded) {
      if (err) console.log(err);
      console.log(decoded);
      req.user_id = decoded.user_id;
    });
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
};
module.exports = authJWT;
