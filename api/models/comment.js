var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    }
}, {
    versionKey: false
});

module.exports = mongoose.model("Comment", commentSchema);
