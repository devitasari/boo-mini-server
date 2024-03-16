const { Schema, model } = require('mongoose')

const likeSchema = new Schema({
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        required: [true, 'commentId is required']
    },
    likerId: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: [true, 'likerId is required']
    }
}, {
    timestamps: true
})

const Like = model('Like', likeSchema)

module.exports = Like