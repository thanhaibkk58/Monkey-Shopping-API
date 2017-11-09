var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cart: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Cart"
    }],
    created_at: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        required: false
    },
    ship_fullname: {
        type: String,
        required: true
    },
    ship_phone: {
        type: String,
        required: true
    },
    ship_address: {
        type: true,
        required: true
    },
    ship_province: {
        type: String,
        required: true
    },
    ship_city: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model("Order", orderSchema);
