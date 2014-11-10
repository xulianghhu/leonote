/**
 * Created by Leo on 14-11-10.
 */

var users = require('./controllers/users');
var categories = require('./controllers/categories');
var blogs = require('./controllers/blogs');

module.exports = function (app) {

	app.get('/index', users.index);
	app.get('/login', users.login);
	app.post('/signin', users.signin);
	app.post('/signup', users.signup);


	app.get('/users/:userId', users.show);

	app.param('categoryId', categories.load);
	app.get('/categories', users.auth, categories.list);
	app.get('/categories/new', users.auth, categories.new);
	app.get('/categories/:categoryId/edit', users.auth, categories.edit);
	app.post('/categories', users.auth, categories.create);


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
