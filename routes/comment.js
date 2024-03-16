const router = require('express').Router()
const CommentController = require('../controllers/commentController')

router.post('/:profileId', CommentController.post)
router.get('/:profileId', CommentController.findByProfileId)

module.exports = router