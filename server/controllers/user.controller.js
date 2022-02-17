const User = require('../models/user.model');
const escape = require('escape-html');

/**
 * @desc This function returns users by user id.
 * @route GET /user/:userId
 * @access Admin
 */
exports.getUserById = async (req, res) => {
	const userId = escape(req.params.userId);

	User.findById(userId)
		.then((user) => res.status(200).json(user))
		.catch((err) => res.status(400).json(err));
};

/**
 * @desc This function returns users by site.
 * @route GET /user/site/:siteid
 * @access Admin
 */
exports.getUsersBySite = async (req, res) => {
	const site = escape(req.params.siteId);

	User.find({ site: site, type: 2 })
		.then((users) => res.status(200).json(users))
		.catch((err) => res.status(400).json(err));
};

/**
 * @desc This function updates users by id.
 * @route PUT /user/:userId
 * @access Admin
 */
exports.updateUserById = async (req, res) => {
	const updateQuery = {};
	if (req.body.firstName) updateQuery.firstName = escape(req.body.firstName);
	if (req.body.lastName) updateQuery.lastName = escape(req.body.lastName);
	if (req.body.middleInitial)
		updateQuery.middleInitial = escape(req.body.middleInitial);
	if (req.body.phone) updateQuery.phone = escape(req.body.phone);
	if (req.body.email) updateQuery.email = escape(req.body.email);
	if (req.body.avatar) updateQuery.avatar = escape(req.body.avatar);
	if (req.body.bio) updateQuery.bio = escape(req.body.bio);
	if (req.body.verified) updateQuery.verified = escape(req.body.verified);
	if (req.body.site) updateQuery.site = escape(req.body.site);
	const userId = escape(req.params.userId);

	User.findByIdAndUpdate(userId, updateQuery, { new: true })
		.then((user) => {
			if (!user) res.status(404).json('Error: User ID does not exist.');
			res.status(200).json(user);
		})
		.catch((err) => res.status(400).json(err));
};

/**
 * @desc This function activates/deactivates users by id.
 * @route PUT /user/:userId
 * @access Admin
 */
exports.toggleUserActivatedById = async (req, res) => {
	const userId = escape(req.params.userId);
	const siteId = escape(req.params.siteId);
	const user = await User.findById(userId);

	if (!user) return res.status(404).json('Error: User ID does not exist.');
	if (user.site != siteId)
		return res.status(404).json('User is not part of this site.');

	const updateQuery = { activated: !user.activated };

	User.findByIdAndUpdate(userId, updateQuery, { new: true })
		.then((user) => res.status(200).json(user))
		.catch((err) => res.status(400).json(err));
};
