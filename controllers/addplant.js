const Express = require('express');
const router = Express.Router();

const { models } = require('./models');
const validateJWT = require('../middleware/validate-jwt');

// POST Plant

router.post("/add", validateJWT, async (req, res) => {
    const { plant, description, genus, species } = req.body.log; //change req.body.log
    const { id } = req.user;
    const addPlant = {
        plant,
        description,
        genus,
        species,
        owner: id
    }
    try {
        const newAddPlant = await models.LogModel.create(addPlant); //change LogModel
        res.status(200).json(newAddPlant);
    } catch (err) {
        res.status(500).json({ error: err, attempt: addPlant });
    }

});

module.exports = router;