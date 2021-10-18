const {Schema, model} = require('mongoose')

const userModel = new Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
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
    description: {
        type: String,
        default: ''
    },
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