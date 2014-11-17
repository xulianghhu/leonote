/**
 * Created by Leo on 14-11-17.
 */

var mongoose = require('mongoose');
var response = require('../lib/response');


exports.create = function (req, res) {
	var blog = req.blog;
	var user = req.session.user;

	blog.addComment(user, req.body, function (err) {
		response.handle(res,err);
	});
};