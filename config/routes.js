const express = require("express");
const router  = express.Router();
const histEventsController = require("../controllers/histEvents");
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

router.route("/histEvents")
  .post(secureRoute, histEventsController.create)
  .get(secureRoute, histEventsController.index);

router.route("/histEvents/:id")
  .all(secureRoute)
  .get(histEventsController.show)
  .put(histEventsController.update)
  .delete(histEventsController.delete);


module.exports = router;
