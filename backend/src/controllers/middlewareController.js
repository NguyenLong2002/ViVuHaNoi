const jwt = require("jsonwebtoken");

const middlewareController = {
    // Middleware để xác minh token
    verifyToken: (req, res, next) => {
        //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
        const token = req.headers.authorization?.split(' ')[1];
        console.log(token);

        if (token) {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) {
                    return res.status(403).json("Token is not valid!");
                }
                req.user = user;
                next();
            });
        } else {
            res.status(401).json("You're not authenticated");
        }
      },

      verifyTokenAndUserAuthorization: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
          if (req.user.id === req.params.id|| req.user.admin) {
            next();
          } else {
            res.status(403).json("You're not allowed to do that!");
          }
        });
      },
      
       verifyTokenAndAdmin: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
          if (req.user.admin) {
            next();
          } else {
            res.status(403).json("You're not allowed to do that!");
          }
        })
    },
};

module.exports = middlewareController;
