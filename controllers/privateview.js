const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { GardenModel } = require("../models/garden");

router.get("/privateview", validateJWT, async (req, res) => {
    const username = req.user.id;
    const passwordhash = req.params.id;

    try {
        const userGarden = await GardenModel.findAll({
            where: {
                username: username,
                passwordhash: passwordhash
            }
        });
        res.status(200).json(userGarden);
    } catch (err) {
        res.status(500).json({error: err});
    }
});