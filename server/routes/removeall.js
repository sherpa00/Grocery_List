const express = require("express");
const router = express.Router();
const GroceryModel = require("../models/grocery");

router.get("/",(req,res) => {
    res.send("RemoveAll section");
});

router.delete("/",async (req,res) => {
    try {
        let removeAllGrocery = await GroceryModel.deleteMany({});
        res.json({
            success: true,
            output: removeAllGrocery
        })
    } catch (err) {
        res.json({
            success: false,
            output: err
        })
    }
    
});

module.exports = router;