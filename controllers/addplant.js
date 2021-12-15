const Express = require('express');
const router = Express.Router();

const { GardenModel } = require('../models');
const validateJWT = require('../middleware/validate-jwt');

// POST Plant

router.post("/", validateJWT, async (req, res) => {
    const { plantName, species, plantImage, season} = req.body.garden;
    const { idNumber } = req.user;
    const addPlant = {
        plantName:plantName,
        species:species,
        plantImage:plantImage,
        season:season,
        owner_id: idNumber
    }
    
    try {
        const createPlant = await GardenModel.create(addPlant);
        res.status(200).json(addPlant);
    } catch (err) {
        res.status(500).json({ error: err});
    }

});

module.exports = router;