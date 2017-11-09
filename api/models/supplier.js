var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var supplierSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    homepage: {
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

module.exports = mongoose.model("Suppier", supplierSchema);
