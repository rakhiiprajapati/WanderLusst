const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utiles/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

const userController = require("../controllers/users.js")

router.get("/signup",userController.renderSignup );

router.post(
  "/signup",
  wrapAsync(userController.signup)
);

router.get("/login", userController.RenderloginForm);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),

  userController.login
);
    
 

router.get("/logout", userController.logout);

module.exports = router;