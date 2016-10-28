const express = require("express");
const router  = express.Router();
const dogsController = require("../controllers/dogs");
const authController = require('../controllers/auth');
const jwt    = require("jsonwebtoken");

const secret  =  require('./tokens').secret;


function secureRoute(req, res, next) {
  if(!req.headers.authorization) return res.status(401).json({
    message: "Unauthorized" });

  let token = req.headers.authorization.replace('Bearer ', '');

  jwt.verify(token, secret, (err, payload) => {
    if(err) return res.status(401).json({ message: "Unauthorized" });

    req.user = payload;

    next();
  });
}

router.route("/register")
  .post(authController.register);


router.route("/login")
  .post(authController.login);

router.route("/dogs")
  .post(secureRoute, dogsController.create)
  .get(secureRoute, dogsController.index);

router.route("/dogs/:id")
  .all(secureRoute)
  .get(dogsController.show)
  .put(dogsController.update)
  .delete(dogsController.delete);


module.exports = router;
