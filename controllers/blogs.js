/**
 * Created by Leo on 14-11-10.
 */

var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');
var response = require('../lib/response');

exports.load = function (req, res, next, id) {
	Blog.load(id, function (err, blog) {
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
	res.render('blogs/edit', {
		title: '创建博客',
		categories: req.categories
	});
};

exports.edit = function (req, res) {
	res.render('blogs/edit', {
		title: '更新博客',
		blog: req.blog,
		categories: req.categories
	});
};

exports.create = function (req, res) {
	var blog = new Blog(req.body);
	blog.author = req.session.user._id;
	console.log(blog)
	blog.save(function (err) {
		res.redirect('/blogs/' + blog._id);
	});
};

exports.detail = function (req, res) {
	res.render('blogs/detail', {
		title: req.blog.title,
		blog: req.blog
	});
};

exports.content = function (req, res) {
	res.end(req.blog.content);
};