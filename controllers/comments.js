/**
 * Created by Leo on 14-11-17.
 */

var mongoose = require('mongoose');
var response = require('../lib/response');


exports.create = function (req, res) {
	var blog = req.blog;
	var body = req.body.body || '';
	var user = req.session.user;
	if (!body || body.trim().length <= 0) {
		return response.error(res, new Error('评论内容不能为空'));
	}
	if (user) {
		blog.comments.push({body: body, user: user._id});
	} else {
		blog.comments.push({body: body});
	}
	blog.save(function (err) {
		response.handle(res, err);
	});
};