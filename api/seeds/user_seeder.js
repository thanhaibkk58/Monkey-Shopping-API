var mongoose = require("mongoose");
var User = require("../models/user");

var config = require("../utils/config");

// Connect mongoose
mongoose.connect(config.url, {
    useMongoClient: true
});

var users = [
    new User({
        _id: new mongoose.Types.ObjectId,
        email: "MichaelRRice@armyspy.com",
        password: "edaeyeiR8ye",
        phone: "+1 937-281-2905",
        avatar_url: "http://www.fakenamegenerator.com/gen-male-us-us.php",
        firstname: "Michael",
        lastname: "R. Rice",
        birthday: "March 14, 1957",
        sex: "Male",
        point: 0,
        address: "8567 Burning Pathway",
        province: "Peace",
        city: "Alabama",
        postal_code: "36075-4647",
        isAdmin: false
    }),
    new User({
        _id: new mongoose.Types.ObjectId,
        email: "ar-gard@egl-inc.info",
        password: "?AvYNAPy4E",
        phone: "+1 402-705-1425",
        avatar_url: "http://www.fakenamegenerator.com/gen-male-us-us.php",
        firstname: "Phil",
        lastname: "L. Murphy",
        birthday: "November 6, 1958",
        sex: "Male",
        point: 0,
        address: "2171 Snowbird Lane",
        province: "Hastings",
        city: "NE",
        postal_code: "68901",
        isAdmin: false
    }),
    new User({
        _id: new mongoose.Types.ObjectId,
        email: "KimberlyJBarber@teleworm.us",
        password: "bee8Ahj0nai",
        phone: "+1 402-656-1148",
        avatar_url: "http://www.fakenamegenerator.com/gen-male-us-us.php",
        firstname: "Kimberly",
        lastname: "J. Barber",
        birthday: "April 19, 1966",
        sex: "Female",
        point: 0,
        address: "3354 Snowbird Lane",
        province: "Plymouth",
        city: "NE",
        postal_code: "68424",
        isAdmin: false
    }),
    new User({
        _id: new mongoose.Types.ObjectId,
        email: "PatriciaNHaskell@teleworm.us",
        password: "Yee7aR4roo",
        phone: "+1 302-314-7897",
        avatar_url: "http://www.fakenamegenerator.com/gen-male-us-us.php",
        firstname: "Patricia",
        lastname: "N. Haskell",
        birthday: "June 4, 1976",
        sex: "Female",
        point: 0,
        address: "4508 Argonne Street",
        province: "Newark",
        city: "DE",
        postal_code: "19711",
        isAdmin: false
    }),
    new User({
        _id: new mongoose.Types.ObjectId,
        email: "BernardPVance@armyspy.com",
        password: "iPho5neishee",
        phone: "+1 409-833-1088",
        avatar_url: "http://www.fakenamegenerator.com/gen-male-us-us.php",
        firstname: "Bernard",
        lastname: "P. Vance",
        birthday: "October 1, 1940",
        sex: "Male",
        point: 0,
        address: "1516 Lynn Ogden Lane",
        province: "Beaumont",
        city: "TX",
        postal_code: "77701",
        isAdmin: false
    })
];

var done = 0;
for (var i = 0; i < users.length; i++) {
    User.create(users[i], function (err, user) {
        if (err) return err;
        else {
            done++;
            // console.log("email: " + user.email);
            if (done === users.length) {
                console.log("Done!");
                exit();
            }
        }
    })
}

function exit() {
    mongoose.disconnect();
}
