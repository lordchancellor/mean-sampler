var express = require('express');
var router = express.Router();
const User = require('../models/user');

router.get('/', (req, res, next) => {
    User.findOne({}, (err, doc) => {
        if (err) {
            return res.send('error');
        }

        res.render('node', { email: doc.email });
    });
});

router.post('/', (req, res, next) => {
    const email = req.body.email;
    const user = new User({
        firstName: 'Chris',
        lastName: 'Ford',
        password: 'Password1',
        email
    });

    user.save();

    res.redirect(`/`);
});

module.exports = router;
