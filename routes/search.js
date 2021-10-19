const {Router} = require('express')
const router = Router()


router.get("/search", (req, res) => {
    res.render("search", {
        title: "Search page",
        cssFileName: "search",
        isClouds: true,
      });
})

module.exports = router