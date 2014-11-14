/**
 * Created by Leo on 14-11-10.
 */

var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var response = require('../lib/response');

/**
 * 根据请求id加载类别的中间件
 */
exports.load = function (req, res, next, id) {
	Category.findOne({_id: id}, function (err, category) {
		if (err || !category) {
			var err = new Error('Not Found');
			err.status = 404;
			return next(err);
		}
		req.category = category;
		console.log(category.blogCount)
		next();
	});
};

/**
 * 加载全部类别的中间件
 */
exports.loadAll = function (req, res, next) {
	Category.find()
		.sort('-priority -create_time')
		.exec(function (err, categories) {
			req.categories = categories;
			next();
		});
};

exports.list = function (req, res) {
	Category.find()
		.sort('-priority')
		.exec(function (err, categories) {
			res.render('categories/list', {
				title: '类别管理',
				categories: err ? [] : categories
			});
		});
};

exports.new = function (req, res) {
	res.render('categories/edit', {
		title: '创建类别'
	});
};

exports.edit = function (req, res) {
	res.render('categories/edit', {
		title: '更新类别',
		category: req.category
	});
};

exports.create = function (req, res) {
	var category = new Category(req.body);
	category.save(function (err) {
		response.handle(res, err);
	});
};

exports.update = function (req, res) {
	Category.update({_id: req.params.categoryId}, req.body, function (err) {
		response.handle(res, err);
	});
};

exports.delete = function (req, res) {
	Category.remove({_id: req.params.categoryId}, function (err) {
		response.handle(res, err);
	});
};
