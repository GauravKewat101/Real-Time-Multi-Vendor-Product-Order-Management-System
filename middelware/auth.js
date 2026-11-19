const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  let token;
  try {
    const authorization = req?.headers?.authorization;

    if (authorization && authorization?.startsWith("Bearer ")) {
        token = authorization.split(" ")[1];
    }

    console.log(token);

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    console.log(decoded);
    if(!decoded){
        res.status(401).send({message: "authentication required"});
    }

    req.user = decoded;
    next();

  } catch (err) {
    res.status(402).send({message: err});
  }
};
