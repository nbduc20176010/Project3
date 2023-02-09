const router = require("express").Router();
const User = require("../models/User");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

//update user
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
        ).toString();
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.json(err);
    }
});

//delete user
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json("user has been deleted");
    } catch (err) {
        res.json(err);
    }
});

//get all users
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    let page = req.query.page;
    let size = req.query.size;
    try {
        const total = await User.find({ isAdmin: false });
        const users = await User.find({ isAdmin: false })
            .skip(page * size - size)
            .limit(size);
        res.json({ result: users, total: total.length });
    } catch (err) {
        res.json(err);
    }
});

//get user by id
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.json(others);
    } catch (err) {
        res.json(err);
    }
});

//active/deactive user account
router.put("/status/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.json(err);
    }
});

//get user stats
router.get("/stats");

module.exports = router;
