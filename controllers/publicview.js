const Express = require("express");
const router = Express.Router();
const { GardenModel } = require("../models/garden");

router.get("/publicview", async (req, res) => {
    try {
        const allGardens = await GardenModel.findAll();
        res.status(200).json(allGardens);
    } catch (err) {
        res.status(500).json({error:err});
    }
});

module.exports = router;