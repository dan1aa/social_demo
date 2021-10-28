const {Router} = require('express')
const router = Router()
const closeRoutesMiddleware = require('../middlewares/closeRoutes')
const User = require('../models/User')
const Post = require('../models/Post')


router.get('/user', closeRoutesMiddleware, async (req, res) => {
    try {
        const { name, pointsCount, likesCount, followers, placement } = req.session.user;
        const posts = await Post.find({userId: req.session.user._id})
        res.render('user', {
            title: "User profile",
            cssFileName: 'user',
            isClouds: true,
            posts,
            name,
            pointsCount,
            likesCount,
            followers,
            placement
        })
    }
    catch(e) {
        throw new Error(e)
    }
})

router.post('/addpost', async (req, res) => {
    const post = await new Post({
        title: req.body.add_post_title,
        text: req.body.add_post_text,
        userId: req.session.user
    })
    await post.save()
    res.redirect('/user')
})

router.post('/putlike', (req, res) => {
})

module.exports = router