const { Schema, model, Types, isValidObjectId, SchemaTypes } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const { schema } = require('./User');

const ThoughtSchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment's _id field
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
      username: {
        type: String,
        required: true
      },
      reactions: [
        {
          type: Schema.Types.ObjectId,
          ref: "reactions"
        }
      ]
    },
    {
      toJSON: {
        getters: true
      }
    }
  );

  const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280
      },
      username: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
      // use ReplySchema to validate data for a reply
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

  CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
  });

const Comment = model('Comment', CommentSchema);

module.exports = Comment;