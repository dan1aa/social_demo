const {Schema, model} = require('mongoose')

const userModel = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    postsCount: {
        type: Number,
        default: 0
    },
    posts: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                postId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Post',
                    required: true
                }
            }
        ]
    },
    pointsCount: {
        type: Number,
        default: 0
    },
    likesCount: {
        type: Number,
        default: 0
    },
    followingOn: [],
    followers: {
        type: Number,
        default: 0
    },
    placement: {
        type: Number,
        default: 0
    }

})

module.exports = model('User', userModel)