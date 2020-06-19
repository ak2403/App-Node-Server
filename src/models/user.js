const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    }
})

const UserModel = mongoose.model('User', UserSchema)
module.exports = UserModel;