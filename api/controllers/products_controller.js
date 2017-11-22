var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var message = require("../utils/message");
var Product = require("../models/product");

var verifyToken = require("./verify_token");

/* ---------------------------------------------------- */
/* POST - Create */
router.post("/api/products/add", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    var product = new Product({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        created_at: Date.now(),
        updated_at: Date.now(),
        price: req.body.price,
        quantity: req.body.quantity,
        discontinued: req.body.discontinued,
        category: req.body.category,
        supplier: req.body.supplier
    });
    Product.create(product, verifyToken, function (err, result) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        res.status(200).send(result);
    });
});


module.exports = router;
