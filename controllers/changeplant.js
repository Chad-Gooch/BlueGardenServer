const Express = require('express');
const router = Express.Router();

const { models } = require('./models');
const validateJWT = require('../middleware/validate-jwt');

// Update Plants

router.put('/create/:log_id', validateJWT, (req, res)=> { // change log_id
    const {plant, description, genus, species} = req.body.log; // change req.body.log

    models.LogModel.update({ // change LogModel
        plant,
        description,
        genus,
        species
    }, {
        where: {
            id: req.params.log_id // change log_id
        }
    })
    .then(updatePlant => res.status(200).json(updatePlant))
    .catch(err => res.status(500).json({
        error: err
    }))
});

module.exports = router;