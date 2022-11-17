const express = require("express");
const router = express.Router();
const GroceryModel = require("../models/grocery");

router.get("/",(req,res) => {
    res.send("Compleded section");
});

router.patch("/:id",async (req,res) => {
    // update the completed doc in mongodb
    try {
        let completedGrocery = await GroceryModel.updateOne(
            {
                _id : req.params.id
            },
            {
                completed: req.body.completed
            }
        );
        res.json({
            success: true,
            output: completedGrocery
        });
    } catch (err) {
        res.json({
            success: false,
            output: err
        })
    }
});

module.exports = router;