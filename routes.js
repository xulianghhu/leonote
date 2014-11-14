/**
 * Created by Leo on 14-11-10.
 */

var main = require('./controllers/main');
var users = require('./controllers/users');
var categories = require('./controllers/categories');
var blogs = require('./controllers/blogs');

module.exports = function (app) {

	app.use(function (req, res, next) {
		res.locals.user = req.session.user;
		next();
	});

	app.get('/index', main.index); // 主页
	app.get('/login', main.login); // 登录页
	app.get('/blog', main.blog); // 博客
	app.get('/admin', users.requireAdmin, main.admin); // 后台管理

	app.get('/logout', users.logout); // 登出
	app.post('/signin', users.signin); // 登录
	app.post('/signup', users.signup); // 注册

	app.get('/users', users.requireAdmin, users.list); // 用户列表
	app.post('/users/:userId/seal', users.requireAdmin, users.seal); // 封号
	app.post('/users/:userId/unseal', users.requireAdmin, users.unseal); // 解封

	app.param('categoryId', categories.load);
	app.get('/categories', users.requireAdmin, categories.list); // 类别列表
	app.get('/categories/new', users.requireAdmin, categories.new); // 新建类别页
	app.get('/categories/:categoryId/edit', users.requireAdmin, categories.edit); // 更新类别页
	app.post('/categories', users.requireAdmin, categories.create); // 新建类别
	app.put('/categories/:categoryId', users.requireAdmin, categories.update); // 保存类别更改
	app.delete('/categories/:categoryId', users.requireAdmin, categories.delete); // 删除类别

	app.param('blogId', blogs.load);
	app.get('/blogs', users.requireAdmin, blogs.list); // 博客列表
	app.get('/blogs/new', users.requireAdmin, categories.loadAll, blogs.new); // 创建博客页
	app.get('/blogs/:blogId/edit', users.requireAdmin, categories.loadAll, blogs.edit); // 更新博客页
	app.post('/blogs', users.requireAdmin, blogs.create); // 新建博客
	app.put('/blogs/:blogId', users.requireAdmin, blogs.update); // 保存博客更改
	app.get('/blogs/:blogId', blogs.detail); // 博客详情
	app.get('/blogs/:blogId/content', blogs.content); // 博客内容
	app.delete('/blogs/:blogId',blogs.delete);

	// catch 404 and forward to error handler
	app.use(function (req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// error handlers

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
		app.use(function (err, req, res, next) {
			res.status(err.status || 500);
			res.render('error', {
				message: err.message,
				error: err
			});
		});
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
}
