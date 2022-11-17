const express = require("express");
const router = express.Router();

const GroceryModel = require("../models/grocery");

// READ ALL GROCERY
router.get("/", async (req,res) => {
    
    try {
        let readGrocery = await GroceryModel.find();
        res.json({
            success: true,
            output: readGrocery
        })
    } catch (err) {
        res.json({
            success: false,
            output: err
        })
    }
});

// READ SINGLE GROCERY
router.get("/:id",async (req,res) => {
    try {
        let readGrocery = await GroceryModel.findById(req.params.id);
        res.json({
            success: true,
            output: readGrocery
        })
    } catch (err) {
        res.json({
            success: false,
            output: err
        })
    }
})



module.exports = router