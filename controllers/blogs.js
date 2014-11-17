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
	var blog = new Blog();
	blog.title = req.body.title;
	blog.content = req.body.content;
	if (req.body.category) {
		blog.category = req.body.category;
	}
	blog.author = req.session.user._id;
	blog.save(function (err) {
		if (err) {
			response.error(res, err);
		} else {
			response.success(res, blog._id);
		}
	});
};

exports.update = function (req, res) {
	Blog.update({_id: req.params.blogId}, req.body, function (err) {
		response.handle(res, err);
	});
};

exports.content = function (req, res) {
	return res.end(req.blog.content);
};

exports.detail = function (req, res) {
	// 浏览数+1
	Blog.update({_id: req.params.blogId}, {count: req.blog.count + 1}, function (err) {
	});
	res.render('blogs/detail', {
		title: req.blog.title,
		blog: req.blog
	});
};

exports.delete = function (req, res) {
	// 逻辑删除
	Blog.update({_id: req.params.blogId}, {status: -1}, function (err) {
		response.handle(res, err);
	});
};

exports.reduce = function (req, res) {
	Blog.update({_id: req.params.blogId}, {status: 0}, function (err) {
		response.handle(res, err);
	});
};

exports.stick = function (req, res) {
	Blog.update({_id: req.params.blogId}, {status: 1}, function (err) {
		response.handle(res, err);
	});
};