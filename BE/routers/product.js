const router = require("express").Router();
const Product = require("../models/Product");
const multer = require("multer");

const { verifyTokenAndAdmin } = require("./verifyToken");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpeg"
        ) {
            cb(null, "uploads");
        } else {
            cb(null, false);
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.filename + ".jpg");
    },
});
const upload = multer({ storage: storage });

//create product
router.post(
    "/",
    verifyTokenAndAdmin,
    upload.single("image"),
    async (req, res) => {
        const newProduct = new Product({
            ...req.body,
            image: {
                data: req.file.filename,
                contentType: req.file.mimetype,
            },
            status: "active",
        });
        try {
            await newProduct.save();
            const total = await Product.find();
            res.json(total.length);
        } catch (err) {
            res.json(err);
        }
    }
);

//update product
router.put(
    "/:id",
    verifyTokenAndAdmin,
    upload.single("image"),
    async (req, res) => {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        ...req.body,
                        image: {
                            data: req.file.filename,
                            contentType: req.file.mimetype,
                        },
                    },
                },
                { new: true }
            );
            res.json(updatedProduct);
        } catch (err) {
            res.json(err);
        }
    }
);

//delete product
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                status: "delete",
            },
            { new: true }
        );
        res.json(deleteProduct);
    } catch (err) {
        res.json(err);
    }
});

//get all products
router.get("/all", async (req, res) => {
    const category = req.query.category;
    const page = req.query.page;
    const size = req.query.size;
    try {
        const total = await Product.find();
        const products =
            category !== "all"
                ? await Product.find({
                      category: category,
                  })
                      .skip(page * size - size)
                      .limit(size)
                : await Product.find()
                      .skip(page * size - size)
                      .limit(size);
        res.json({ result: products, total: total.length });
    } catch (err) {
        res.json(err);
    }
});

//get only active product
router.get("/", async (req, res) => {
    const category = req.query.category;
    const page = req.query.page;
    const size = req.query.size;
    try {
        let total;
        let products;
        if (category !== "all") {
            total = await Product.find({
                category: category,
                status: "active",
            });
            products = await Product.find({
                category: category,
                status: "active",
            })
                .skip(page * size - size)
                .limit(size);
        } else {
            total = await Product.find({
                status: "active",
            });
            products = await Product.find({
                status: "active",
            })
                .skip(page * size - size)
                .limit(size);
        }
        res.json({ result: products, total: total.length });
    } catch (err) {
        res.json(err);
    }
});

//get product by id
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;
