const mongoose = require("mongoose");

const keySchema = new mongoose.Schema(
    {
        key: {
            type: String,
            required: true,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product",
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Order",
        },
    },
    {
        timestamps: true,
        collection: "Keys",
    }
);

module.exports = mongoose.model("Key", keySchema);
