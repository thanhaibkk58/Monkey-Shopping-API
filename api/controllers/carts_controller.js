var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var message = require("../utils/message");
var Cart = require("../models/cart");

var verifyToken = require("./verify_token");

/* ---------------------------------------------------- */
/* POST - Get all products in a user's cart */
router.post("/api/carts/user/:id", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    Cart
        .find({user: req.params.id})
        .populate("product")
        .exec(function (err, carts) {
            if (err) return res.status(500).send(message.ERROR_SERVER);
            res.status(200).send(carts);
        });
});

/* ---------------------------------------------------- */
/* POST - Add a product to the cart */
router.post("/api/carts/add", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    var cart = new Cart({
        _id: new mongoose.Types.ObjectId,
        created_at: Date.now(),
        updated_at: Date.now(),
        product: req.body.product,
        quantity: req.body.quantity,
        user: req.body.user
    });

    cart.save(function(err, result) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        Cart
            .findOne(result)
            .populate("product")
            .exec(function (err, _cart) {
                if (err) return res.status(500).send(message.ERROR_SERVER);
                res.status(200).send(_cart);
            });
    });
});

/* ---------------------------------------------------- */
/* PUT - Update the quantity of a product in the cart */
router.put("/api/carts/:id", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    Cart.findByIdAndUpdate(req.params.id, {quantity: req.body.quantity}, function (err, result) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        res.status(200).send(result);
    });
});

/* ---------------------------------------------------- */
/* DELETE - Remove a product from the cart */
router.delete("/api/carts/:id", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    Cart.findByIdAndRemove(req.params.id, req.body, function (err, result) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        res.json(result);
    });
});

module.exports = router;