const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const NestedCommentSchema = new Schema({
    body: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    board:{
        type: Schema.Types.ObjectId,
        ref: 'Board'
    }
})

module.exports = mongoose.model('NestedComment', NestedCommentSchema);