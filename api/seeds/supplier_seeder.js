var mongoose = require("mongoose");
var Supplier = require("../models/supplier");

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

var suppliers = [
    new Supplier({
        _id: new mongoose.Types.ObjectId,
        name: "Canon",
        email: "canon@gmail.com",
        phone: "+1 989-541-4866",
        description: "Canon Inc. (キヤノン株式会社 Kiyanon Kabushiki-gaisha) is a Japanese multinational corporation specialized in the manufacture of imaging and optical products, including cameras, camcorders, photocopiers, steppers, computer printers and medical equipment.",
        address: "1686 Mount Street, Durand, MI 48429",
        homepage: "canon.com",
        image_url: "medicallower.com"
    }),
    new Supplier({
        _id: new mongoose.Types.ObjectId,
        name: "Nikon",
        email: "nikon@gmail.com",
        phone: "+1 989-541-4866",
        description: "Canon Inc. (キヤノン株式会社 Kiyanon Kabushiki-gaisha) is a Japanese multinational corporation specialized in the manufacture of imaging and optical products, including cameras, camcorders, photocopiers, steppers, computer printers and medical equipment.",
        address: "1686 Mount Street, Durand, MI 48429",
        homepage: "nikon.com",
        image_url: "medicallower.com"
    }),
    new Supplier({
        _id: new mongoose.Types.ObjectId,
        name: "Sony",
        email: "sony@gmail.com",
        phone: "+1 212-863-9723",
        description: "Canon Inc. (キヤノン株式会社 Kiyanon Kabushiki-gaisha) is a Japanese multinational corporation specialized in the manufacture of imaging and optical products, including cameras, camcorders, photocopiers, steppers, computer printers and medical equipment.",
        address: "2749 Small Street, New York, NY 10017",
        homepage: "sony.com",
        image_url: "medicallower.com"
    })
];

var done = 0;
for (var i = 0; i < suppliers.length; i++) {
    Supplier.create(suppliers[i], function (err, supplier) {
        if (err) return err;
        else {
            done++;
            if (done === suppliers.length) {
                console.log("Done!");
                exit();
            }
        }
    })
}

function exit() {
    mongoose.disconnect();
}
