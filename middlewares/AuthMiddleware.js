const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Unauthorized",
          success: false,
          error: "User is not authorized",
          source: process.env.API_NAME,
        });
      } else {
        //req.body.email = decoded.id;
        next();
      }
    });
  } catch (e) {
    return res.status(401).json({
      message: "Unauthorized",
      success: false,
      error: "User is not authorized",
      source: process.env.API_NAME,
    });
  }
};
