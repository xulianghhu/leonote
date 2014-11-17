/**
 * Created by Leo on 14-11-17.
 */

var mongoose = require('mongoose');
var Feedback = mongoose.model('Feedback');
var response = require('../lib/response');

exports.load = function (req, res, next, id) {
	Feedback.findOne({_id: id})
			.populate('user', 'email username')
			.exec(function (err, feedback) {
				if (err || !feedback) {
					var err = new Error('Not Found');
					err.status = 404;
					return next(err);
				}
				req.feedback = feedback;
				next();
			});
};

exports.create = function (req, res) {
	var feedback = new Feedback(req.body);
	if (req.session.user) {
		feedback.user = req.session.user._id;
	}

	feedback.save(function (err) {
		response.handle(res, err);
	});
};

exports.list = function (req, res) {
	Feedback.find()
			.sort('-create_time')
			.populate('user', 'email username')
			.exec(function (err, feedbacks) {
				res.render('feedbacks/list', {
					title: '反馈管理',
					feedbacks: err ? [] : feedbacks
				});
			});
};

exports.detail = function (req, res) {
	res.render('feedbacks/detail', {
		title: '反馈详细',
		feedback: req.feedback
	});
};