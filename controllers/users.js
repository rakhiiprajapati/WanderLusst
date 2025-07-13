const User = require("../models/user");


module.exports.renderSignup = (req, res) => {
  res.render("users/signup.ejs");
}


module.exports.signup = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ username, email });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser ,(err) =>{
        if(err){
           return next(err)
        } 
           req.flash("success", "Welcome to WanderLust");
      res.redirect("/listings");
      });
  
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }

module.exports.RenderloginForm = (req, res) => {
  res.render("users/login.ejs");
};
module.exports.login = async (req, res) => {
     try {
      req.flash("success",` Welcome to Wanderlust, ${req.body.username}!`);
      let redirectUrl = res.locals.redirectUrl || "/listings"
      res.redirect(redirectUrl);
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/login");
    }
  };
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  req.flash("success", "logged you are it");
  res.redirect("/listings");
};

