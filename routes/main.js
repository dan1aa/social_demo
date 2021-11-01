const { Router } = require("express");
const bcrypt = require('bcrypt')
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
      name: log_in_name
    });
    if (candidate) {
      const areSame = await bcrypt.compare(log_in_password, candidate.password)

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
    throw new Error(e)
  }
});

router.post("/signup", async (req, res) => {
  const { sign_up_name, sign_up_password, sign_up_email } = req.body;
  const candidate = await User.findOne({ name: sign_up_name })

  if(candidate) {
    console.log('Already register!')
  }
  else {
    const hashPassword = await bcrypt.hash(sign_up_password, 10);
    const user = new User({
      name: sign_up_name,
      password: hashPassword,
      email: sign_up_email,
      posts: [],
      pointsCount: 0,
      likesCount: 0
    });
    req.session.user = user;
    req.session.isAuth = true;
    req.session.save((err) => {
      if (err) {throw new Error(e)}
      else {
        console.log('session loaded')
      }
    })

    await user.save();
    console.log(user.name, user.email)
    res.redirect(`/`);
  }
});

router.get('/forgotpassword', (req, res) => {
  res.render('forgotPassword', {
    title: 'Reset password',
    cssFileName: 'forgotPassword'
  })
})

module.exports = router;
