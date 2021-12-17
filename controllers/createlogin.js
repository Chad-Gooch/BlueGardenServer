const router = require('express').Router();
const { LoginModel } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
    let { email, password } = req.body.user;
    let date = new Date();
    
    
    try {
    const User = await LoginModel.create({
        email,
        password: bcrypt.hashSync(password, 12),
        lastLogin: date,
    });

    let token = jwt.sign({idNumber: User.idNumber}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

    res.status(201).json({
        message: 'User successfully registered',
        user: User,
        sessionToken: token
    });
    } catch (err) {
        
        res.status(500).json({
            message: `${err}Failed to register user`,
        });
    }
});

module.exports = router;