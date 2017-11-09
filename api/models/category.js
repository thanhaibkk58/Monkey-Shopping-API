var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model("Category", categorySchema);
