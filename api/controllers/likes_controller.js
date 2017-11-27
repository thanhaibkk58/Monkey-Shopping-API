var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var message = require("../utils/message");
var Like = require("../models/like");

var verifyToken = require("./verify_token");

/* ---------------------------------------------------- */
/* POST - GET all likes */
router.post("/api/likes", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    var index = parseInt(req.body.index);
    var count = parseInt(req.body.count);
    var idProduct = req.body.id_product;
    Like
        .find({product: idProduct}).sort({_id: -1}).limit(count).skip(index)
        .populate("user")
        .exec(function (err, likes) {
            if (err) return res.status(500).send(message.ERROR_SERVER);
            res.status(200).send(likes);
        });
});

/* ---------------------------------------------------- */
/* POST - Create a like */
router.post("/api/likes/add", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    var like = new Like({
        _id: new mongoose.Types.ObjectId,
        user: req.body.user,
        product: req.body.product
    });

    like.save(function(err, result) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        Comment
            .findOne(result)
            .populate("user")
            .populate("product")
            .exec(function (err, _like) {
                if (err) return res.status(500).send(message.ERROR_SERVER);
                res.status(200).send(_like);
            });
    });
});

/* ---------------------------------------------------- */
/* DELETE - Unlike */
router.delete("/api/likes/:id", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    Like.findByIdAndRemove(req.params.id, req.body, function (err, result) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        res.json(result);
    });
});

module.exports = router;
