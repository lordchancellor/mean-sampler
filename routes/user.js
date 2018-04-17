const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const User = require('../models/user');

router.post('/', (req, res, next) => {
	const user = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: bcrypt.hashSync(req.body.password, 10),
		email: req.body.email
	});

	user.save((err, result) => {
		if (err) {
			return res.status(500).json({
				title: 'An error occurred',
				error: err
			});
		}

		res.status(201).json({
			message: 'User created',
			result
		});
	});
});

router.post('/signin', (req, res, next) => {
	User.findOne({
		email: req.body.email
	}, 
	(err, user) => {
		if (err) {
			return res.status(500).json({
				title: 'An error occurred',
				error: err
			});
		}

		if (!user) {
			return res.status(401).json({
				title: 'Email and/or password was incorrect',
				error: { message: 'Could not log in' }
			});
		}

		if (!bcrypt.compareSync(req.body.password, user.password)) {
			return res.status(401).json({
				title: 'Email and/or password was incorrect',
				error: { message: 'Could not log in' }
			});
		}

		const token = JWT.sign({ user }, 'secret', { expiresIn: 7200 });

		res.status(200).json({
			message: 'Successfully logged in',
			token,
			userId: user._id
		});
	});
});

module.exports = router;