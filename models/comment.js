const { Schema, model } = require('mongoose')
const { MBTI, Enneagram, Zodiac } = require('./constants')

const commentSchema = new Schema({
    commentatorId: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: [true, 'commentatorId is required']
    },
    profileId: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: [true, 'profileId is required']
    },
    title: {
        type: String,
        required: [true, 'title is required'],
    },
    description: {
        type: String,
        required: [true, 'description is required'],
    },
    mbti: {
        type: String,
        enum: Object.keys(MBTI)
    },
    enneagram: {
        type: String,
        enum: Object.keys(Enneagram)
    },
    zodiac: {
        type: String,
        enum: Object.keys(Zodiac)
    }
}, {
    timestamps: true
})

const Comment = model('Comment', commentSchema)

module.exports = Comment