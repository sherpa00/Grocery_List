const express = require("express");
const router = express.Router();
const GroceryModel = require("../models/grocery");

router.get("/",(req,res) => {
    res.send("Delete section");
});

router.delete("/:id", async (req,res) => {
    try {
        let deleteGrocery = await GroceryModel.deleteOne({
            _id: req.params.id
        });
        res.json({
            success: true,
            output: deleteGrocery
        });
    } catch(err) {
        res.json({
            success: false,
            output: err
        })
    }
});

module.exports = router;