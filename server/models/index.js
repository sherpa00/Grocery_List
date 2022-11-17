const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL,(err) => {
    if (!err) {
        console.log("Connected to db..");
    }
});
