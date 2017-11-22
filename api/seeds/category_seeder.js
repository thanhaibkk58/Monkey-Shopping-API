var mongoose = require("mongoose");
var Category = require("../models/category");

var config = require("../utils/config");

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

var categories = [
    new Category({
        _id: new mongoose.Types.ObjectId,
        name: "DSLR",
        description: "Nothing to show",
        image_url: "https://my.vertabelo.com/model/Tlkae4u9PgrAiBhtFnl8Ob4K4r9veEs1"
    }),
    new Category({
        _id: new mongoose.Types.ObjectId,
        name: "Compact",
        description: "Nothing to show",
        image_url: "https://my.vertabelo.com/model/Tlkae4u9PgrAiBhtFnl8Ob4K4r9veEs1"
    }),
    new Category({
        _id: new mongoose.Types.ObjectId,
        name: "MIL",
        description: "Nothing to show",
        image_url: "https://my.vertabelo.com/model/Tlkae4u9PgrAiBhtFnl8Ob4K4r9veEs1"
    })
];

var done = 0;
for (var i = 0; i < categories.length; i++) {
    Category.create(categories[i], function (err, categorie) {
        if (err) return err;
        else {
            done++;
            if (done === categories.length) {
                console.log("Done!");
                exit();
            }
        }
    })
}

function exit() {
    mongoose.disconnect();
}
