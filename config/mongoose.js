const mongoose = require('mongoose');

(async () => {
    await mongoose.connect(
        process.env.MONGO_URI,
        { 
            autoIndex: false,
            dbName: 'boo' 
        }
    );
})()