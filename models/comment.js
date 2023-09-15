const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    body: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    nestedComments:{
        type: Schema.Types.ObjectId,
        ref: 'NestedComment'
    }
});

module.exports = mongoose.model('Comment', CommentSchema);