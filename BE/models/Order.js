const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            ref: "User",
        },
        products: {
            productId: String,
            quantity: {
                type: Number,
                default: 1,
            },
        },
        total: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema);
