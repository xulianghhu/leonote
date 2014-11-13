/**
 * Created by Leo on 14-11-13.
 */

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

exports.admin = function (req, res) {
	res.render('admin', {
		title: '后台管理'
	});
};