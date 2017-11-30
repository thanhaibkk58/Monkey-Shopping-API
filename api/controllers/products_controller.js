var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var message = require("../utils/message");
var Product = require("../models/product");

var verifyToken = require("./verify_token");

/* ---------------------------------------------------- */
/* POST - Get a few products */
router.post("/api/products", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    var index = parseInt(req.body.index);
    var count = parseInt(req.body.count);

    Product
        .find({}).sort({_id: -1}).limit(count).skip(index)
        .populate("category")
        .populate("supplier")
        .exec(function (err, products) {
            if (err) return res.status(500).send(message.ERROR_SERVER);
            res.status(200).send(products);
        });
});

/* ---------------------------------------------------- */
/* GET - Get a product */
router.get("/api/products/:id", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    Product
        .findById(req.params.id)
        .populate("category")
        .populate("supplier")
        .exec(function (err, product) {
            if (err) return res.status(500).send(message.ERROR_SERVER);
            res.status(200).send(product);
        });
});

/* ---------------------------------------------------- */
/* POST - Create a product */
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

    product.save(function(err, result) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        Product
            .findOne(result)
            .populate("category")
            .populate("supplier")
            .exec(function (err, _product) {
                if (err) return res.status(500).send(message.ERROR_SERVER);
                res.status(200).send(_product);
        });
    });
});

/* ---------------------------------------------------- */
/* PUT - Update a product */
router.put("/api/products/:id", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    var product = new Product({
        _id: req.params.id,
        name: req.body.name,
        created_at: req.body.created_at,
        updated_at: Date.now(),
        price: req.body.price,
        quantity: req.body.quantity,
        discontinued: req.body.discontinued,
        category: req.body.category,
        supplier: req.body.supplier
    });

    Product.update(product, function(err, result) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        Product
            .findOne(product)
            .populate("category")
            .populate("supplier")
            .exec(function (err, _product) {
                if (err) return res.status(500).send(message.ERROR_SERVER);
                res.status(200).send(_product);
            });
    });
});

/* ---------------------------------------------------- */
/* DELETE - Delete a product */
router.delete("/api/products/:id", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    Product.findByIdAndRemove(req.params.id, req.body, function (err, result) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        res.json(result);
    });
});

module.exports = router;
