const { Like } = require('../models')

class LikeController {
    static like(req, res, next) {
        Like.create({
            likerId: req.body.likerId,
            commentId: req.params.commentId
        })
        .then(like => {
            res.status(201).json(like)
        }).catch(next)
    }

    static unlike(req, res, next) {
        Like.deleteOne({             
            likerId: req.body.likerId,
            commentId: req.params.commentId
        })
        .then(like => {
            let status = 201
            if (!like.deletedCount) status = 404

            res.status(status).json(like)
        }).catch(next)
    }

}

module.exports = LikeController