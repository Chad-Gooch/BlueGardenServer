const Express = require('express');
const router = Express.Router();

const { GardenModel } = require('../models');
const validateJWT = require('../middleware/validate-jwt');

// Update Plants

router.put('/:gardens_id', validateJWT, (req, res)=> {
    const {plantName, species, plantImage, season} = req.body.garden;

    GardenModel.update({ 
        plantName:plantName,
        species:species,
        plantImage:plantImage,
        season:season,
    }, {
        where: {
            idNumber: req.params.gardens_id
        }
    })
    .then(updatePlant => res.status(200).json(updatePlant))
    .catch(err => res.status(500).json({
        error: err
    }))
});

module.exports = router;