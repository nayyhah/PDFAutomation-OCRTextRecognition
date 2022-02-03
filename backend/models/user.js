const mongoose = require('mongoose');
const passport = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
    },
    queries: [{
        type: Schema.Types.ObjectId,
        ref: 'Query'
    }],
    // companyName: {
    //     type: String,
    //     trim: true,
    // },
    // email: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     unique: true,
    //     lowercase: true,
    // },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

userSchema.virtual("fullName").get(function() {
    return `${this.firstName} ${this.lastName}`;
});

userSchema.plugin(passport);


module.exports = mongoose.model("User", userSchema);