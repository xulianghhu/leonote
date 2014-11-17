/**
 * Created by Leo on 14-11-10.
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');
var response = require('../lib/response');

/**
 * 验证是否登录的中间件,
 * 如果已登录执行下一步,否则跳到登录界面
 */
exports.requireLogin = function (req, res, next) {
	if (req.session.user) {
		next();
	} else {
		var err = new Error('Require Login');
		err.status = 403;
		next(err);
	}
};

/**
 * 验证是否是管理员,如果不是返回403
 */
exports.requireAdmin = function (req, res, next) {
	if (req.session.user && req.session.user.status === 1) {
		next();
	} else {
		var err = new Error('Forbidden');
		err.status = 403;
		next(err);
	}
};

exports.logout = function (req, res) {
	req.session.user = undefined;
	res.redirect('/index');
};

exports.signin = function (req, res) {
	var email = req.body.email;
	var password = req.body.password;
	var url = req.body.url ? req.body.url : '/';
	var user = User.findOne({email: email}, function (err, user) {
		if (err) {
			response.error(res, err)
		} else {
			if (user) {
				if (user.authenticate(password)) {
					if (user.status > -1) {
						req.session.user = user;
						response.success(res, url);
					} else {
						response.error(res, new Error('该帐号已被冻结'));
					}
				} else {
					response.error(res, new Error('密码错误'));
				}
			} else {
				response.error(res, new Error('用户不存在'));
			}
		}
	});
}

exports.signup = function (req, res) {
	var user = new User(req.body);
	user.save(function (err) {
		if (err) {
			response.error(res, err);
		} else {
			req.session.user = user;
			response.success(res);
		}
	});
};

exports.list = function (req, res) {
	User.find()
			.sort('-status -create_time')
			.exec(function (err, users) {
				res.render('users/list', {
					title: '账号管理',
					users: err ? [] : users
				});
			});
};

exports.seal = function (req, res) {
	User.update({_id: req.params.userId}, {status: -1}, function (err) {
		response.handle(res, err);
	});
};

/**
 * 解封或者解除管理员权限
 */
exports.unseal = function (req, res) {
	User.update({_id: req.params.userId}, {status: 0}, function (err) {
		response.handle(res, err);
	});
};

exports.grant = function (req, res) {
	User.update({_id: req.params.userId}, {status: 1}, function (err) {
		response.handle(res, err);
	});
};