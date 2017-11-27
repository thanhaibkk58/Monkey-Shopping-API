var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var bcryptjs = require("bcryptjs");

var config = require("../utils/config");
var message = require("../utils/message");
var User = require("../models/user");

var verifyToken = require("./verify_token");

/* ---------------------------------------------------- */
/* POST - Get some user information */
router.post("/api/users", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    var index = parseInt(req.body.index);
    var count = parseInt(req.body.count);
    User.find(function (err, users) {
        if (err) res.status(500).send(message.ERROR_SERVER);
        res.json(users);
    }).sort({_id: -1}).limit(count).skip(index);
});

/* ---------------------------------------------------- */
/* POST - Sign up */
router.post("/api/signup", function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    var hashedPassword = bcryptjs.hashSync(req.body.password, 8);
    var user = new User({
        _id: new mongoose.Types.ObjectId,
        email: req.body.email,
        password: hashedPassword,
        phone: "",
        avatar_url: "",
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthday: "",
        sex: "",
        point: 0,
        address: "",
        province: "",
        city: "",
        postal_code: "",
        isAdmin: req.body.isAdmin
    });

    User.create(user, function (err, result) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        // Create a token
        var token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 86400 // Expires in 24 hours
        });
        res.status(200).send({
            auth: true,
            token: token,
            user: result
        });
    });
});

/* ---------------------------------------------------- */
/* POST - Login */
router.post("/api/login", function(req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    User.findOne({email: req.body.email}, function (err, user) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        if (!user) return res.status(400).send(message.NOT_FOUND);
        var passwordIsValid = bcryptjs.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send(message.NOT_AUTHORIZED);
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // Expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token, user: user});
    });
});

/* ---------------------------------------------------- */
/* GET - Log out */
router.get("/api/logout", verifyToken, function(req, res) {
    res.status(200).send(message.NOT_AUTHORIZED);
});

/* ---------------------------------------------------- */
/* GET - Get profile */
router.get("/api/profile/:id", function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    User.findById(req.params.id, function (err, result) {
        if (err) return res.status(400).send(message.ERROR_SERVER);
        res.json(result);
    });
});

/* ---------------------------------------------------- */
/* PUT - Update profile */
router.put("/api/profile/:id", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    var hashedPassword = bcryptjs.hashSync(req.body.password, 8);
    var user = new User({
        _id: req.params.id,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
        avatar_url: req.body.avatar_url,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthday: req.body.birthday,
        sex: req.body.sex,
        address: req.body.address,
        province: req.body.province,
        city: req.body.city,
        postal_code: req.body.postal_code,
        isAdmin: req.body.isAdmin
    });
    User.findByIdAndUpdate(req.params.id, user, function (err, result) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        res.json(result);
    });
});

/* ---------------------------------------------------- */
/* DELETE - Delete a user */
router.delete("/api/profile/:id", verifyToken, function (req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    User.findByIdAndRemove(req.params.id, req.body, function (err, result) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        res.json(result);
    });
});

/* ---------------------------------------------------- */
/* GET - me */
router.post("/api/me", verifyToken, function(req, res) {
    if (!req.body) return res.status(400).send(message.BAD_REQUEST);
    User.findById(req.userId, function (err, user) {
        if (err) return res.status(500).send(message.ERROR_SERVER);
        if (!user) return res.status(404).send(message.NOT_FOUND);
        res.status(200).send(user);
    });
});

// Add the middleware function
router.use(function (user, req, res, next) {
    res.status(200).send(user);
});

module.exports = router;
