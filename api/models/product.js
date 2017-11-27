var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    discontinued: {
        type: Boolean,
        required: true,
        default: false
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: "Suppier"
    }
}, {
    versionKey: false
});

module.exports = mongoose.model("Product", productSchema);
