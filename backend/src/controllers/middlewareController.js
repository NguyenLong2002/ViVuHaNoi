const jwt = require("jsonwebtoken");

const middlewareController = {
    // Middleware để xác minh token
    verifyToken: (req, res, next) => {
        //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
        const token = req.cookies.accessToken;
        if (!token) {
          console.log("No token found");
          return res.status(401).json("You're not authenticated");
        }
        if (token) {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) {
                    return res.status(401).json("Token is not valid!");
                }
                req.user = user;
                next();
            });
        } else {
            return res.status(401).json("You're not authenticated");
        }
      },

      verifyUser: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
          if (req.user.id === req.params.id|| req.user.role==='admin') {
            next();
          } else {
            res.status(403).json("You're not allowed to do that!");
          }
        });
      },
      
      verifyAdmin: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
          if (req.user.role==="admin") {
            next();
          } else {
            res.status(403).json("You're not allowed to do that!");
          }
        })
    },
};

module.exports = middlewareController;
