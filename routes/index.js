const express = require('express')
const ProfileRoutes = require('./profile')
const CommentRoutes = require('./comment')
const LikeRoutes = require('./like')

const router = express.Router()

router.get('/', function(req,res,next) {
    res.status(200).json({
        message: 'You are connected to Boo server'
    })
})

router.use('/profiles', ProfileRoutes)
router.use('/comments', CommentRoutes)
router.use('/likes', LikeRoutes)

module.exports = router