const router = require('express').Router()
const LikeController = require('../controllers/likeController')

router.post('/:commentId', LikeController.like)
router.delete('/:commentId', LikeController.unlike)


module.exports = router