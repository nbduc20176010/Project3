const router = require("express").Router();
const Category = require("../models/Category");

const {
    verifyTokenAndAdmin,
} = require("./verifyToken");

//create category
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newCategory = new Category(req.body);
    try {
        const savedCategory = await newCategory.save();
        res.json(savedCategory);
    } catch (err) {
        res.json(err);
    }
});

//update category
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.json(updatedCategory);
    } catch (err) {
        res.json(err);
    }
});

//delete category
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json("Cateogry has been deleted");
    } catch (err) {
        res.json(err);
    }
});

//get all category
router.get("/", async (req, res) => {
    try {
        Product.find();
        res.json(products);
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;
