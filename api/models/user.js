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
        type: String,
        required: true
    },
    avatar_url: {
        type: String,
        required: true
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
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    point: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postal_code: {
        type: String,
        required: true
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
