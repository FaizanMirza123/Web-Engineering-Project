const jwt=require("jsonwebtoken");

const JWT_SECRET="supersecretkey";
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
console.log(JWT_SECRET)
  if (!token) return res.status(401).send('No token provided');

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
module.exports=authenticateToken