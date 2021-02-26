// connect to the mongoose package
const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
    writtenBy: {
        type: String
    },
    commentBody: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// create the Comment model using the CommentShema
const Comment = model('Comment', CommentSchema);

// export the model
module.exports = Comment;