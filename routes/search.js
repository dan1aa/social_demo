const {Router} = require('express')
const router = Router()
const User = require('../models/User.js')
const Post = require('../models/Post.js')
const closeRoutes = require('../middlewares/closeRoutes')


router.get("/search", closeRoutes, async (req, res) => {
    const currentUser = await User.findOne({ name: req.session.user.name });
    req.session.user.followingOn = currentUser.followingOn;
    console.log(req.session.user.followingOn)
    try {
      res.render("search", {
        title: "Search page",
        cssFileName: "search",
        isClouds: true,
      });
    }
    catch(e) {
      throw new Error(e)
    }
})

router.get('/:username', closeRoutes, async (req, res) => {
  try {
    let { username } = req.params;
    let searchedUser = await User.findOne({ name: username })
    let _id = searchedUser._id
    let posts = await Post.find({ userId: _id })
    res.render("userSearchPage", {
      title: 'User',
      cssFileName: 'user',
      posts,
      username,
      likesCount: searchedUser.likesCount,
      pointsCount: searchedUser.pointsCount,
      placement: searchedUser.placement,
      followers: searchedUser.followers,
      isFollowing: req.session.user.followingOn.includes(username)
    })
  }
  catch(e) {
    throw new Error(e)
  }
})

router.post('/follow', async (req, res) => {
  try {
    const username = req.headers.referer.split('/').splice(-1).toString().replace("?", "")
    const searchedUser = await User.findOne({ name: username });
    await User.updateOne({ name: username }, {followers: searchedUser.followers + 1})
    const { followingOn } = req.session.user;
    followingOn.push(username)
    await User.updateOne({ name: req.session.user.name }, {$push: {followingOn: followingOn}})
    res.redirect('back')
  }
  catch(e) {
    throw new Error(e)
  }
})

router.post('/unfollow', async (req, res) => {
  try {
    const username = req.headers.referer.split('/').splice(-1).toString().replace("?", "")
    const searchedUser = await User.findOne({ name: username });
    await User.updateOne({ name: username }, {followers: searchedUser.followers - 1})
    const { followingOn } = req.session.user;
    await User.updateOne({ name: req.session.user.name }, {$pullAll: {followingOn: [username]}})
    let index = followingOn.indexOf(username);
    if (index !== -1) {
      followingOn.splice(index, 1);
    }
    res.redirect('back') 
  }
  catch(e) {
    throw new Error(e)
  }
})


module.exports = router

