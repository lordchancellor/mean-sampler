const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');

const Message = require('../models/message');
const User = require('../models/user');

router.get('/', (req, res, next) => {
	Message
		.find()
		.populate('user', 'firstName')
		.exec((err, messages) => {
			if (err) {
				return res.status(500).json({
					title: 'An error occurred',
					error: err
				});
			}

			res.status(200).json({
				message: 'Success',
				messages
			});
		});
});

// No access beyond this point for unauthorised users
router.use('/', (req, res, next) => {
	JWT.verify(req.query.token, 'secret', (err, decoded) => {
		if (err) {
			return res.status(401).json({
				title: 'Not Authenticated',
				error: err
			});
		}

		next();
	});
});

router.post('/', (req, res, next) => {
	const decoded = JWT.decode(req.query.token);

	User.findById(decoded.user._id, (err, user) => {
		if (err) {
			return res.status(500).json({
				title: 'An error occurred',
				error: err
			});
		}

		const message = new Message({
			content: req.body.content,
			user: user
		});
	
		message.save((err, result) => {
			if (err) {
				return res.status(500).json({
					title: 'An error occurred',
					error: err
				});
			}

			user.messages.push(result);
			user.save();
	
			res.status(201).json({
				message: 'Saved message',
				obj: result
			});
		});
	});
});

router.patch('/:id', (req, res, next) => {
	const decoded = JWT.decode(req.query.token);

	Message.findById(req.params.id, (err, message) => {
		if (err) {
			return res.status(500).json({
				title: 'An error occurred',
				error: err
			});
		}

		if (!message) {
			return res.status(404).json({
				title: 'No message found',
				error: { message: 'Message not found' }
			});
		}

		if (`${message.user}` !== decoded.user._id) {
			return res.status(401).json({
				title: 'Not authenticated',
				error: { message: 'User does not have permission to edit this message' }
			});
		}

		message.content = req.body.content;
		message.save((err, result) => {
			if (err) {
				return res.status(500).json({
					title: 'An error occurred',
					error: err
				});
			}
	
			res.status(200).json({
				message: 'Updated message',
				obj: result
			});
		})
	});
});

router.delete('/:id', (req, res, next) => {
	const decoded = JWT.decode(req.query.token);

	Message.findById(req.params.id, (err, message) => {
		if (err) {
			return res.status(500).json({
				title: 'An error occurred',
				error: err
			});
		}

		if (!message) {
			return res.status(404).json({
				title: 'No message found',
				error: { message: 'Message not found' }
			});
		}

		if (`${message.user}` !== decoded.user._id) {
			return res.status(401).json({
				title: 'Not authenticated',
				error: { message: 'User does not have permission to delete this message' }
			});
		}

		message.remove((err, result) => {
			if (err) {
				return res.status(500).json({
					title: 'An error occurred',
					error: err
				});
			}
	
			res.status(200).json({
				message: 'Removed message',
				obj: result
			});
		})
	});
})

module.exports = router;