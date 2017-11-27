var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var message = require("../utils/message");
var Comment = require("../models/comment");

var verifyToken = require("./verify_token");

/* ---------------------------------------------------- */
/* POST - GET a few comments */
router.post("/api/comments", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    var index = parseInt(req.body.index);
    var count = parseInt(req.body.count);
    var idProduct = req.body.id_product;
    Comment
        .find({product: idProduct}).sort({_id: -1}).limit(count).skip(index)
        .populate("user")
        .exec(function (err, comments) {
            if (err) return res.status(500).send(message.ERROR_SERVER);
            res.status(200).send(comments);
        });
});

/* ---------------------------------------------------- */
/* POST - Create a comment */
router.post("/api/comments/add", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    var comment = new Comment({
        _id: new mongoose.Types.ObjectId,
        content: req.body.content,
        user: req.body.user,
        product: req.body.product
    });

    comment.save(function(err, result) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        Comment
            .findOne(result)
            .populate("user")
            .populate("product")
            .exec(function (err, _comment) {
                if (err) return res.status(500).send(message.ERROR_SERVER);
                res.status(200).send(_comment);
            });
    });
});

/* ---------------------------------------------------- */
/* PUT - Update a comment */
router.put("/api/comments/:id", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    var comment = new Comment({
        _id: req.params.id,
        content: req.body.content,
        user: req.body.user,
        product: req.body.product
    });

    Comment.update(comment, function(err, result) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        Comment
            .findOne(comment)
            .populate("user")
            .populate("product")
            .exec(function (err, _comment) {
                if (err) return res.status(500).send(message.ERROR_SERVER);
                res.status(200).send(_comment);
            });
    });
});

/* ---------------------------------------------------- */
/* DELETE - Delete a comment */
router.delete("/api/comments/:id", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    Comment.findByIdAndRemove(req.params.id, req.body, function (err, result) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        res.json(result);
    });
});

module.exports = router;
