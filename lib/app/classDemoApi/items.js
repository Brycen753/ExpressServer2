const { Item } = require('../../models/inventory.js');

async function readAllItems(req, res) {
    const items = await Item.find();
    res.json(items);
}

module.exports = {
    readAllItems
};