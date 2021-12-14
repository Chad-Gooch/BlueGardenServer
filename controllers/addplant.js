const Express = require('express');
const router = Express.Router();

const { models } = require('./models');
const validateJWT = require('../middleware/validate-jwt');

// POST Plant

router.post("/addplant", validateJWT, async (req, res) => {
    const { plant, description, genus, species } = req.body.garden; //change req.body.log. req.body.garden?
    const { id } = req.user;
    const addPlant = {
        plant,
        description,
        genus,
        species,
        owner: id
    }
    try {
        const newAddPlant = await models.GardenModel.create(addPlant); //change LogModel. GardenModel?
        res.status(200).json(newAddPlant);
    } catch (err) {
        res.status(500).json({ error: err, attempt: addPlant });
    }

});

module.exports = router;