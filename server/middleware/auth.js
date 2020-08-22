const jwt = require('jsonwebtoken');

const activeTokens = [
  // {
  //   user_id: token
  // }
]
// remove expired tokens based on expiry information inside token
// if expired, splice from authTokens

const authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];
  // if token is in active tokens
  // next();
  try {
    // need to verify
    // push into activeTokens
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

module.exports = authMiddleware;

// req.path
