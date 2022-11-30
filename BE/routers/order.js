const router = require("express").Router();
const Order = require("../models/Order");

const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//create order
router.post("/", verifyTokenAndAuthorization, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.json(savedOrder);
  } catch (err) {
    res.json(err);
  }
});

//update product
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
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
router.get("/", async (req, res) => {
  const page = req.query.page;
  const size = req.query.size;
  try {
    const orders = await Order.find()
      .skip(page * size - size)
      .limit(size);
    res.json(orders);
  } catch (err) {
    res.json(err);
  }
});


module.exports = router;
