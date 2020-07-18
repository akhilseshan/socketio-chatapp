const router = require('express').Router();
const mongoose = require('mongoose');

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.send('logged in successfully')
});

module.exports = router;