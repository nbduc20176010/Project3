const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            ref: "User",
        },
        productId: {
            type: String,
            required: true,
            ref: "Product",
        },
        productName: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        key: [
            {
                type: String,
            },
        ],
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
