const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");

router.delete("/removeplant/:id", validateJWT, async (req, res) => {
    const username = req.user.id;
    const passwordhash = req.params.id;

    try{
        const query = {
            where: {
                username: username,
                passwordhash: passwordhash
                //May need to tweak here
            }
        };
        await GardenModel.destroy(query);
        res.status(200).json({message: "Plant Removed"});
    } catch (err) {
        res.status(500).json({error:err});
    }
})

module.exports = router;