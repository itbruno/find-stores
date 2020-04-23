const express = require('express');
const router = express.Router();

// Get URL schema
const StoreController = require('./controllers/StoreController'); 

router.post('/api/register', StoreController.register);

router.get('/api/stores', StoreController.stores);
router.get('/api/store/:id', StoreController.get);

module.exports = router;