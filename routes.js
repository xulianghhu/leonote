/**
 * Created by Leo on 14-11-10.
 */

var users = require('./controllers/users');
var categories = require('./controllers/categories');
var blogs = require('./controllers/blogs');

module.exports = function (app) {

	app.use(function (req, res, next) {
		res.locals.user = req.session.user;
		next();
	});

	app.get('/index', users.index); // 主页
	app.get('/login', users.login); // 登录页
	app.get('/admin', users.requireAdmin, users.admin); // 后台管理

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
	app.post('/categories', users.requireAdmin, categories.create); // 保存类别更改
	app.put('/categories/:categoryId', users.requireAdmin, categories.update); // 新建类别
	app.delete('/categories/:categoryId', users.requireAdmin, categories.delete); // 删除类别

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
