/**
 * Created by Leo on 14-11-10.
 */

var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');
var response = require('../lib/response');

exports.load = function (req, res, next, id) {
	Blog.findOne({_id: id}, function (err, blog) {
		if (err || !blog) {
			var err = new Error('Not Found');
			err.status = 404;
			return next(err);
		}
		req.blog = blog;
		next();
	});
};

exports.list = function (req, res) {
	Blog.find()
			.sort('-status -create_time')
			.exec(function (err, blogs) {
				res.render('blogs/list', {
					title: '博客管理',
					blogs: err ? [] : blogs
				});
			});
};

exports.new = function (req, res) {
	res.render('categories/edit', {
		title: '新建类别'
	});
};

