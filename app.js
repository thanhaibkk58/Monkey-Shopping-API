var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var config = require("./api/utils/config");

var index = require("./routes/index");
var users = require("./api/controllers/users_controller");
var categories = require("./api/controllers/categories_controller");
var suppliers = require("./api/controllers/suppliers_controller");
var products = require("./api/controllers/products_controller");
var carts = require("./api/controllers/carts_controller");
var comments = require("./api/controllers/comments_controller");
var likes = require("./api/controllers/likes_controller");
var orders = require("./api/controllers/orders_controller");

var app = express();

// Connect mongoose
mongoose.connect(config.url, {
    useMongoClient: true
});

mongoose.connection.on("open", function (ref) {
    console.log("Connected to mongo server...");
});
mongoose.connection.on("error", function (err) {
    console.log("Could not connect to mongo server!");
    console.log(err);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use(users);
app.use(categories);
app.use(suppliers);
app.use(products);
app.use(carts);
app.use(comments);
app.use(likes);
app.use(orders);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
