const Express = require('express');
const router = Express.Router();

const { models } = require('./models');
const validateJWT = require('../middleware/validate-jwt');

// Update Plants

router.put('/changeplant/:user_id', validateJWT, (req, res)=> { // change log_id to changeplant?
    const {plant, description, genus, species} = req.body.garden; // change req.body.log to req.body.garden?

    models.GardenModel.update({ // change LogModel
        plant,
        description,
        genus,
        species
    }, {
        where: {
            id: req.params.user_id // change log_id
        }
    })
    .then(updatePlant => res.status(200).json(updatePlant))
    .catch(err => res.status(500).json({
        error: err
    }))
});

module.exports = router;