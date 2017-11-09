var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var likeSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    }
}, {
    versionKey: false
});

module.exports = mongoose.model("Like", likeSchema);
