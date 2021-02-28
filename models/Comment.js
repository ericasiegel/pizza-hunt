// connect to the mongoose package
const { Schema, model, Types } = require('mongoose');

const dateFormat = require('../utils/dateFormat')

const ReplySchema = new Schema(
    {
        // Set the custom Id to avoid confusion with parent comment _id
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String,
            required: true
        },
        writtenBy: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const CommentSchema = new Schema(
    {
        writtenBy: {
            type: String,
            required: true,
            trim: true
        },
        commentBody: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        // associate replies with comments
        // replies will be nested directly in a comment's document and not referred to
        replies: [ReplySchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// add virtual for CommentSchema to get the total reply count
CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

// create the Comment model using the CommentShema
const Comment = model('Comment', CommentSchema);

// export the model
module.exports = Comment;