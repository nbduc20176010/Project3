const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const usernameCheck = await User.findOne({
        username: req.body.username,
    });
    const emailCheck = await User.findOne({
        email: req.body.email,
    });
    if (!usernameCheck && !emailCheck) {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString(),
        });
        try {
            const savedUser = await newUser.save();
            res.json(savedUser);
        } catch (err) {
            res.json(err);
        }
    } else {
        usernameCheck
            ? res.json({ message: "username already taken!", status: "failed" })
            : res.json({ message: "email already taken!", status: "failed" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
        });
        !user && res.json({ message: "wrong username!", status: "failed" });
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRET_KEY
        );
        const originPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        originPassword !== req.body.password &&
            res.json({ message: "wrong password!", status: "failed" });
        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.SECRET_KEY,
            { expiresIn: "3d" }
        );
        const { password, ...others } = user._doc;
        res.json({ ...others, accessToken });
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;
