var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var message = require("../utils/message");
var Supplier = require("../models/supplier");

var verifyToken = require("./verify_token");

/* ---------------------------------------------------- */
/* POST - Create */
router.post("/api/suppliers/add", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    var supplier = new Supplier({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        homepage: req.body.homepage,
        description: req.body.description,
        image_url: req.body.image_url
    });
    Supplier.create(supplier, verifyToken, function (err, result) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        res.status(200).send(result);
    });
});

/* ---------------------------------------------------- */
/* GET - Get all categories */
router.get("/api/suppliers/all", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    Supplier.find(function (err, suppliers) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        res.status(200).send(suppliers);
    });
});

/* ---------------------------------------------------- */
/* GET - Update a category */
router.put("/api/suppliers/:id", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    var supplier = new Supplier({
        _id: req.params.id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        homepage: req.body.homepage,
        description: req.body.description,
        image_url: req.body.image_url
    });
    Supplier.findByIdAndUpdate(req.params.id, supplier, function (err, result) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        res.json(result);
    });
});

/* ---------------------------------------------------- */
/* DELETE - Delete a category */
router.delete("/api/suppliers/:id", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    Supplier.findByIdAndRemove(req.params.id, req.body, function (err, result) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        res.json(result);
    });
});

module.exports = router;
