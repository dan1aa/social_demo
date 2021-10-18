const {Schema, model} = require('mongoose')

const postModel = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    }

})

module.exports = model('Post', postModel)