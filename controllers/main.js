/**
 * Created by Leo on 14-11-13.
 */
var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var Blog = mongoose.model('Blog');
var eventproxy = require('eventproxy');
var ep = new eventproxy();

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

exports.about = function (req, res) {
	res.render('about', {
		title: '关于我'
	});
};

exports.feedback = function (req, res) {
	res.render('feedbacks/create', {
		title: '意见反馈'
	});
};

exports.admin = function (req, res) {
	res.render('admin', {
		title: '后台管理'
	});
};

exports.blog = function (req, res) {
	var index = req.query.index || 1;
	var size = req.query.size || 5;
	var search = req.query.search;
	var category = req.query.category;

	ep.all('categories', 'pageBlogs', 'count', 'totalCount', 'popularBlogs', function (categories, pageBlogs, count, totalCount, popularBlogs) {
		res.render('blogs/index', {
			title: '博客',
			totalCount: totalCount,
			index: index,
			size: size,
			pageCount: Math.ceil(count / size),
			blogs: pageBlogs,
			popular: popularBlogs,
			selectedCategory: category || '',
			search: search || '',
			categories: categories

		});
	});

	// 查询所有类别
	Category.find()
			.sort('-priority')
			.exec(function (err, categories) {
				if (err || !categories)
					ep.emit('categories', {});
				ep.after('blogCount', categories.length, function (countCategories) {
					ep.emit('categories', countCategories);
				});
				// 查询每个类别的博客数量
				categories.forEach(function (category) {
					Blog.count({category: category._id}, function (err, count) {
						var c = category.toJSON();
						c.blogCount = err ? 0 : count;
						ep.emit('blogCount', c);
					});
				});
			});

	// 分页查询博客
	var criteria = search ? { $or: [
		{title: new RegExp(search)},
		{content: new RegExp(search)}
	]} : {};
	if (category) {
		criteria.category = category === 'others' ? null : category;
	}
	criteria.status = {$gt: -1};
	Blog.find(criteria)
			.sort("-status -create_time")
			.skip((index - 1) * size)
			.limit(size)
			.exec(function (err, blogs) {
				ep.emit('pageBlogs', err ? {} : blogs);
			});

	// 查询出的博客数量
	Blog.count(criteria, function (err, count) {
		ep.emit('count', count ? count : 0);
	});

	// 查询总数量
	Blog.count({status: {$gt: -1}}, function (err, count) {
		ep.emit('totalCount', count ? count : 0);
	});

	// 热门博客
	Blog.find({status: {$gt: -1}})
			.sort("-count -create_time")
			.limit(10)
			.exec(function (err, blogs) {
				ep.emit('popularBlogs', err ? {} : blogs);
			});

};