const mongoose = require("mongoose");

const outdatedTokenSchema = new mongoose.Schema(
    {
        outdatedToken: String,
    },
    {
        timestamps: true,
        collection: "OutdatedTokens",
    }
);

module.exports = mongoose.model("OutdatedToken", outdatedTokenSchema);
