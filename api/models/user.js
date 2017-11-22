var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true,
            dropDups: true
        }
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    avatar_url: {
        type: String
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    birthday: {
        type: String
    },
    sex: {
        type: String
    },
    point: {
        type: Number,
        required: true,
        default: 0
    },
    address: {
        type: String
    },
    province: {
        type: String
    },
    city: {
        type: String
    },
    postal_code: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model("User", userSchema);
