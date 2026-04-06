const mongoose = require('mongoose')

const shopItemSchema = new mongoose.Schema({

    name: { type: String, unique: true },
    description: { type: String},
    price: { type: Number},
    itemType: { type: String},
    itemValue: { type: String}

});

const ShopItem = mongoose.model("ShopItem", shopItemSchema);
module.exports = ShopItem