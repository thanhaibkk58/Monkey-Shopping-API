var jwt = require("jsonwebtoken");
var config = require("../utils/config");

var message = require("../utils/message");

function verifyToken(req, res, next) {
    var token = req.headers["x-access-token"];
    if (!token) res.status(403).send(message.NO_TOKEN);
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(401).send(message.NOT_AUTHORIZED);
        // If everything good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
}
module.exports = verifyToken;
