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

module.exports = router;
