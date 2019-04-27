const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    category: String,
    title: String,
    description: String,
    image: String,
    link: String
});

const Item = mongoose.model('Items', itemSchema);

module.exports = Item;
