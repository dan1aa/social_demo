const {Router} = require('express')
const router = Router()
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator');
const closeRoutesMiddleware = require('../middlewares/closeRoutes')
const User = require('../models/User')
const Post = require('../models/Post')


router.get('/user', closeRoutesMiddleware, async (req, res) => {
    try {
        const { name, pointsCount, likesCount, followers, placement, email } = req.session.user;
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
            placement,
            email
        })
    }
    catch(e) {
        throw new Error(e)
    }
})

router.post('/addpost', closeRoutesMiddleware , async (req, res) => {
    try {
        const post = await new Post({
            title: req.body.title,
            text: req.body.text,
            userId: req.session.user
        })
        await post.save()
        res.redirect('/user')
    }
    catch(e) {
        throw new Error(e)
    }
})

router.get("/logout", (req, res) => {
    try {
        req.session.destroy(() => {
            res.redirect("/");
        });
    }
    catch(e) {
        throw new Error(e)
    }
});

router.post('/editaccountinfo', closeRoutesMiddleware, async (req, res) => {
    try {
        const { new_name, new_email } = req.body;
        const { name } = req.session.user;
        const userWithSimpleName = await User.findOne({ name: new_name })
        if (userWithSimpleName !== null) {
            res.redirect('/user')
        }
        else {
            await User.updateOne({ name }, { name: new_name, email: new_email })
            const updatedUser = await User.findOne({ name: new_name })
            req.session.user = updatedUser;
            res.redirect('/user')
        }
    }
    catch(e) {
        throw new Error(e)
    }
})

router.post('/changepassword', closeRoutesMiddleware, async (req, res) => {
    try {
        const { name } = req.session.user;
        const { new_password, new_password_repeat } = req.body;
        if(new_password === new_password_repeat) {
            const hashPassword = await bcrypt.hash(new_password, 10);
            await User.findOneAndUpdate({ name }, { password: hashPassword })
            res.redirect('/user')
        }
        else {
            res.redirect('/user')
        }
    }
    catch(e) {
        throw new Error(e)
    }
})

router.post('/putlike', (req, res) => {
})

module.exports = router