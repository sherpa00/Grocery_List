const express = require("express");
const router = express.Router();
const GroceryModel = require("../models/grocery");

router.get("/",(req,res) => {
    res.send("add section");
});

router.post("/", async (req,res) => {
    // add here
    let newGrocery = new GroceryModel({
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost,
        ratings: req.body.ratings
    });

    try {
        let saveGrocery = await newGrocery.save();
        res.json({
            success: true,
            output: saveGrocery
        })
        console.log("Doc added");
    } catch (err) {
        res.json({
            success: false,
            output: err
        })
    }
})

module.exports = router;