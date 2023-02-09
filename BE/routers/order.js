const router = require("express").Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const uuid = require("uuid");

const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

//create order
router.post("/", async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.json(savedOrder);
    } catch (err) {
        res.json(err);
    }
});

//approve/unapprove order
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        if (req.body.status === "Approved") {
            const oldQuantity = await Product.findById(updatedOrder.productId);
            let newQuan = oldQuantity.quantity - updatedOrder.quantity;
            const newQuantity = await Product.findByIdAndUpdate(
                updatedOrder.productId,
                {
                    $set: {
                        quantity: newQuan,
                    },
                },
                { new: true }
            );
            let keys = [];
            for (let i = 0; i < updatedOrder.quantity; i++) {
                let key = uuid.v4();
                keys.push(key);
            }
            const updatedOrderKey = await Order.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        key: keys,
                    },
                },
                { new: true }
            );
        }
        res.json(updatedOrder);
    } catch (err) {
        res.json(err);
    }
});

//delete product
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json("Order has been deleted");
    } catch (err) {
        res.json(err);
    }
});

//get all orders
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const page = req.query.page;
    const size = req.query.size;
    try {
        const total = await Order.find();
        const orders = await Order.find()
            .skip(page * size - size)
            .limit(size);
        res.json({ result: orders, total: total.length });
    } catch (err) {
        res.json(err);
    }
});

router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({
            userId: req.params.id,
        });
        res.json(orders);
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;
