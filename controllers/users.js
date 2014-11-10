/**
 * Created by Leo on 14-11-10.
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');
var response = require('../lib/response');

exports.index = function (req, res) {
	res.render('index', {
		title: 'LEONOTE'
	});
}

exports.login = function (req, res) {
	res.render('users/login', {
		title: '登录'
	});
};

/**
 * 验证是否登录中间件
 * @param req
 * @param res
 * @param next
 */
exports.auth = function (req, res, next) {
	if (req.session.authenticated)
		next();
	else
		res.redirect('/login')
}

/**
 * 登录
 * @param req
 * @param res
 */
exports.signin = function (req, res) {
	var email = req.body.email;
	var password = req.body.password;
	var url = req.body.url ? req.body.url : '/index';
	var user = User.findOne({email: email}, function (err, user) {
		if (err) {
			response.error(res, err)
		} else {
			if (user) {
				if (user.authenticate(password)) {
					req.session.authenticated = true;
					req.session.email = user.email;
					req.session.status = user.status;
					response.success(res, url);
				} else {
					response.error(res, new Error('密码错误'));
				}
			} else {
				response.error(res, new Error('用户不存在'));
			}
		}
	});
}

/**
 * 注册
 * @param req
 * @param res
 */
exports.signup = function (req, res) {
	var user = new User(req.body);
	user.save(function (err) {
		if (err)
			response.error(res, err);
		else
			response.success(res);
	});
}


exports.load = function (req, res, next, userId) {

	req.user = userId;
	next();
}

exports.show = function (req, res) {
	res.render('index', {title: req.user});
}