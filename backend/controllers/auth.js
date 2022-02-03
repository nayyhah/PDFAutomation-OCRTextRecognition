const User = require("../models/user");
const jwt = require("jwt-simple");

exports.signup = async(req, res, next) => {
    const {
        firstName,
        lastName,
        username,
        password,
        // companyName
    } = req.body;
    const user = new User({
        firstName,
        lastName,
        // email,
        // companyName,
        username,
    });
    const saved = await User.register(user, password, function(err, msg) {
        if (err) {
            res.send(err);
        } else {
            next();
        }
    });
    // console.log(saved);
};

exports.login = async(req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            console.log("Error Happened In auth /token Route");
        } else {
            var payload = {
                id: user.id,
                expire: Date.now() + 1000 * 60 * 60 * 24 * 7, //7 days
            };
            var token = jwt.encode(payload, process.env.JWT_SECRET);
            res.json({
                token,
                user
            });
        }
    });
};

exports.secret = async(req, res) => {
    res.json({
        data: "Really secretive",
    });
};

exports.deleteUser = async(req, res) => {
    await User.findByIdAndDelete(req.user.id);
};