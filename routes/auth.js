const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register ======
router.post("/register", async (req, res) => {
    try {
        // hashing password
        const salt = await bcrypt.genSalt(10); // generating a salt of 10digit
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });
        const user = await newUser.save(); // to save using mongoose
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login ======
router.post("/login", async (req, res) => {
    try {
        const user = User.findOne({ username: req.body.username });
        !user && res.status(400).json("Wrong information"); // when no user

        // when there is an user
        const validate = await bcrypt.compare(req.body.password, user.password); // req theke je pass asche tar sathe db te je user peyechi tar pass comapre kora hocche
        !validate && res.status(400).json("Wrong information");

        // there is valid user
        const { password, ...othersInfo } = user._doc; // for not sending password
        res.status(200).json(othersInfo);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
