const { Comment } = require('../models')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class CommentController {
    static post(req, res, next) {
        if (req.body?.commentatorId === req.params?.profileId) {
            next({status: 401, message: 'comment self profile is prohibited'})
        }

        Comment.create({
            commentatorId: req.body.commentatorId,
            profileId: req.params.profileId,
            title: req.body.title,
            description: req.body.description,
            mbti: req.body.mbti,
            enneagram: req.body.enneagram,
            zodiac: req.body.zodiac
        })
        .then(comment => {
            res.status(201).json(comment)
        }).catch(next)
    }

    static findByProfileId(req, res, next) {
        const mbti = req.query.mbti
        const enneagram = req.query.enneagram
        const zodiac = req.query.zodiac
        let matchQuery = { profileId: new ObjectId(req.params.profileId) };

        if (mbti) {
            matchQuery.mbti = mbti;
        }
        if (enneagram) {
            matchQuery.enneagram = enneagram;
        }
        if (zodiac) {
            matchQuery.zodiac = zodiac;
        }

        const sortField = req.query.sort || 'createdAt'
        const sortOrder = req.query.order || 'desc'

        let sortOption = {};
        sortOption[sortField] = sortOrder === 'asc' ? 1 : -1;

        Comment.aggregate([
            {
                $match: matchQuery,
            },
            {
                $lookup: {
                  from: 'profiles',
                  localField: 'commentatorId', 
                  foreignField: '_id', 
                  as: 'commentator', 
                },
            },
            {
                $lookup: {
                  from: 'likes',
                  localField: '_id',
                  foreignField: 'commentId',
                  as: 'likes',
                },
            },
            {
                $sort: sortOption
            },
          ])        
          .then(comments => {
            let status = 200
            if (comments.length < 1) status = 404

            res.status(status).json(comments)
        }).catch(next)
    }
}

module.exports = CommentController