var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var message = require("../utils/message");
var Categogy = require("../models/category");

var verifyToken = require("./verify_token");

/* ---------------------------------------------------- */
/* POST - Create */
router.post("/api/categories/add", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    var category = new Categogy({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        description: req.body.description,
        image_url: req.body.image_url
    });
    Categogy.create(category, function (err, result) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        res.status(200).send(result);
    });
});

/* ---------------------------------------------------- */
/* GET - Get all categories */
router.get("/api/categories/all", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    Categogy.find(function (err, categories) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        res.status(200).send(categories);
    });
});

/* ---------------------------------------------------- */
/* GET - Update a category */
router.put("/api/categories/:id", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    var category = new Categogy({
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        image_url: req.body.image_url
    });
    Categogy.findByIdAndUpdate(req.params.id, category, function (err, result) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        res.json(result);
    });
});

/* ---------------------------------------------------- */
/* DELETE - Delete a category */
router.delete("/api/categories/:id", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    User.findByIdAndRemove(req.params.id, req.body, function (err, result) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        res.json(result);
    });
});

module.exports = router;
