var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var cartSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        required: false
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    order_id: {
        type: Schema.Types.ObjectId,
        ref: "Order"
    }
}, {
    versionKey: false
});

module.exports = mongoose.model("Cart", cartSchema);
