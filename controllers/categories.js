/**
 * Created by Leo on 14-11-10.
 */

var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var response = require('../lib/response');

exports.load = function (req, res, next, id) {
	Category.findOne({_id: id}, function (err, category) {
		if (err || !category) {
			var err = new Error('Not Found');
			err.status = 404;
			return next(err);
		}
		req.category = category;
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
		title: '新建类别'
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
		if (err)
			response.error(res, err);
		else
			response.success(res);
	});
};
