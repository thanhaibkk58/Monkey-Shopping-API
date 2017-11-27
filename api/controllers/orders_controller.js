var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var message = require("../utils/message");
var Order = require("../models/order");

var verifyToken = require("./verify_token");

/* ---------------------------------------------------- */
/* GET - Get a order */
router.get("/api/orders/:id", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    Order
        .findById(req.params.id)
        .populate("user")
        .populate("cart")
        .exec(function (err, _orders) {
            if (err) return res.status(500).send(message.ERROR_SERVER);
            res.status(200).send(_orders);
        });
});

/* ---------------------------------------------------- */
/* POST - Create a order */
router.post("/api/orders/add", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    var order = new Order({
        _id: new mongoose.Types.ObjectId,
        user: req.body.user,
        cart: req.body.cart, // Array
        created_at: Date.now(),
        updated_at: Date.now(),
        ship_fullname: req.body.ship_fullname,
        ship_phone: req.body.ship_phone,
        ship_address: req.body.ship_address,
        ship_province: req.body.ship_province,
        ship_city: req.body.ship_city,
        amount: req.body.amount,
        status: req.body.status
    });

    order.save(function(err, result) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        Order
            .findOne(order)
            .populate("user")
            .populate("cart")
            .exec(function (err, _orders) {
                if (err) return res.status(500).send(message.ERROR_SERVER);
                res.status(200).send(_orders);
            });
    });
});

/* ---------------------------------------------------- */
/* PUT - Update a order */
router.put("/api/orders/:id", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    var order = new Order({
        _id: req.params.id,
        user: req.body.user,
        cart: req.body.cart, // array
        created_at: Date.now(),
        updated_at: Date.now(),
        ship_fullname: req.body.ship_fullname,
        ship_phone: req.body.ship_phone,
        ship_address: req.body.ship_address,
        ship_province: req.body.ship_province,
        ship_city: req.body.ship_city,
        amount: req.body.amount,
        status: req.body.status
    });
    Order.update(order, function (err, result) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        Order
            .findOne(order)
            .populate("user")
            .populate("cart")
            .exec(function (err, _orders) {
                if (err) return res.status(500).send(message.ERROR_SERVER);
                res.status(200).send(_orders);
            });
    });
});

/* ---------------------------------------------------- */
/* DELETE - Delete a order */
router.delete("/api/orders/:id", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    Order.findByIdAndRemove(req.params.id, req.body, function (err, result) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        res.json(result);
    });
});

module.exports = router;
