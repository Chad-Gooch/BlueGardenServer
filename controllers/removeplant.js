const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { GardenModel } = require("../models");

router.delete("/:id", validateJWT, async (req, res) => {

    try{
        const query = {
            where: {
                idNumber: req.params.id,
            }
        };

        await GardenModel.destroy(query);
        res.status(200).json({message: "Plant Removed"});
    } catch (err) {
        res.status(500).json({error:err});
    }
})

module.exports = router;