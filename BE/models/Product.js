const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        image: {
            data: String,
            contentType: String,
        },
        price: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        status: {
            type: String,
        },
    },
    {
        timestamps: true,
        collection: "Products",
    }
);

module.exports = mongoose.model("Product", productSchema);
