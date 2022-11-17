const express = require("express");
const router = express.Router();
const GroceryModel = require("../models/grocery");

router.get("/",(req,res) => {
    res.send("Edit section");
});

// UPDATE A GROCERY
router.patch("/:id", async (req,res) => {
    
    try {
        let updateGrocery = await GroceryModel.updateOne(
            {
                _id: req.params.id
            },
            {
                name: req.body.name,
                description: req.body.description,
                cost: req.body.cost,
                ratings: req.body.ratings
            });

            res.json({
                success: true,
                output: updateGrocery
            })

    } catch (err) {
        res.json({
            success: false,
            output: err
        })
    }
})

module.exports = router;