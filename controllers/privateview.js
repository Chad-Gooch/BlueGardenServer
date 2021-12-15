const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { GardenModel } = require("../models");

router.get("/", validateJWT, async (req, res) => {
   const { idNumber } = req.user;

    try {
        const myGarden = await GardenModel.findAll({
            where: {
                owner_id: idNumber,
            }
        });
        res.status(200).json(myGarden);
    } catch (err) {
        res.status(500).json({error: `${idNumber}`});
    }
});

module.exports = router;