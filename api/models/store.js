const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    name: String,
    url: String,
    category: String,
    createdAt: { 
        type: String,
        default: Date.now()
    }
});

module.exports = mongoose.model('Store', storeSchema);