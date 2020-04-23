const Store = require('../models/store');
const validUrl = require('valid-url');

module.exports = {
    async stores(req, res) {
        try {
            const list = await Store.find();
            
            res.json(list);

        } catch(err) {
            console.error(err.message);
        }
    },

    async register(req, res) {
        const { name, url, category } = req.body;

        if(!validUrl.isUri(url)) {
            return res.status(401).json('Wrong url');
        }

        if(validUrl.isUri(url)) {
            try {
                let theStore = await Store.findOne({ url });

                if(theStore) {
                    res.status(208).json('Url already exist.');
                } else {
                    theStore = new Store({
                        name,
                        url,
                        category,
                        date: new Date()
                    });

                    await theStore.save();
                    res.json(theStore);
                }
            } catch(err) {
                console.error(err);
                res.status(500).json('Server error');
            }
            
        }
    },

    async get(req, res) {
        const storeID = req.params.id;

        try {
            const store = await Store.findOne({ _id: storeID });
            
            res.json(store);

        } catch(err) {
            res.status(404);
        }
    } 
}
