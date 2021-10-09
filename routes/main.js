const { Router } = require("express");
const User = require("../models/User");
const router = Router();

router.get("/", (req, res) => {
  res.render("main", {
    title: "Main page",
    cssFileName: "main",
    isClouds: true,
  });
});

router.post("/login", async (req, res) => {
  try {
    const { log_in_name, log_in_password } = req.body;
    const candidate = await User.findOne({
      name: log_in_name,
      password: log_in_password,
    });
    if (candidate) {
      const areSame = candidate.password === log_in_password;

      if (areSame) {
        req.session.user = candidate;
        req.session.isAuth = true;
        req.session.save((err) => {
          if (err) throw err;
          else {
            res.redirect("/");
          }
        });
      } else {
        console.log("Login error");
      }
    } else {
      console.log("Login error");
    }
  } catch (e) {
    console.log(e);
  }
});

router.post("/signup", async (req, res) => {
  const { sign_up_name, sign_up_password } = req.body;
  const candidate = await User.findOne({ name: sign_up_name })

  if(candidate) {
    console.log('Already register!')
  }
  else {
    const user = new User({
      name: sign_up_name,
      password: sign_up_password,
      posts: [],
      pointsCount: 0,
      likesCount: 0,
      description: ""
    });
    req.session.user = user;
    req.session.isAuth = true;
    req.session.save((err) => {
      if (err) {console.log(e)}
      else {
        console.log('session loaded')
      }
    })

    await user.save();
    res.redirect(`/`);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
