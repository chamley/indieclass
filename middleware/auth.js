const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
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
    console.log('hello, inside Auth');
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

module.exports = authMiddleware;
