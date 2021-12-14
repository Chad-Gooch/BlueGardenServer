const router = require('express').Router();
const { LoginModel } = require('../models');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
    let { email, password } = req.body.user;
    let date = new Date();
    let current = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    
    try {
    const User = await LoginModel.create({
        email,
        password: bcrypt.hashSync(password, 12),
        lastLogin: current,
    });

    let token = jwt.sign({idNumber: User.idNumber}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

    res.status(201).json({
        message: 'User successfully registered',
        user: User,
        sessionToken: token
    });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "username already in use",
            });
        } else {
        res.status(500).json({
            message: 'Failed to register user',
        });
        }
    }
});

module.exports = router;