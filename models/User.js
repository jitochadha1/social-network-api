const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
          },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']

        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get total count of a User's friends on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.comments.reduce((total, friends) => total + friends.length + 1, 0);
  });

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;