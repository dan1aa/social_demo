const { Router } = require("express");
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator');
const User = require("../models/User");
const closeRoutesMiddleware = require('../middlewares/closeRoutes')
const router = Router();

router.get("/", (req, res) => {
  try {
    res.render("main", {
      title: "Main page",
      cssFileName: "main",
      isClouds: true,
    });
  }
  catch(e) {
    throw new Error(e)
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const candidate = await User.findOne({
      name: username
    });
    if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password)

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
  } 
  catch (e) {
    throw new Error(e)
  }
});

router.post("/signup",
  body("username").isLength({ min: 3, max: 15 }).isString().trim().escape(),
  body("password").isLength({ min: 8, max: 50 }).trim().escape(),
  body("email").isEmail().trim().escape(),
  async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, email } = req.body;
    if((Number(username) === NaN) || (Number(username) === null)) {
      res.json({message: 'Not valid name', num: Number(username)})
      res.redirect('/')
    }

    const nameCandidate = await User.findOne({ name: username })
    const emailCandidate = await User.findOne({ email })

    if(nameCandidate || emailCandidate) {
      res.json({message: 'Already register'})
      res.redirect('/')
    }
    else {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name: username,
        password: hashPassword,
        email: email,
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
  }
  catch(e) {
    throw new Error(e)
  }
});

router.get('/forgotpassword', closeRoutesMiddleware, (req, res) => {
  try {
    res.render('forgotPassword', {
      title: 'Reset password',
      cssFileName: 'forgotPassword'
    })
  }
  catch(e) {
    throw new Error(e)
  }
})

module.exports = router;
