/**
 * Created by Leo on 14-11-10.
 */

exports.success = function (res, message) {
	var result = {};
	result.code = 0;
	result.message = message || '操作成功';
	res.json(result);
}

exports.error = function (res, err) {
	var result = {};

	var errors = err.errors || [err];
	console.log(errors)
	var keys = Object.keys(errors);
	var message = '';

	if (!keys) {
		message = '操作失败';
	} else {
		var errs = [];
		keys.forEach(function (key) {
			if (errors[key]) {
				errs.push(errors[key].message);
			}
		});
		message = errs.join(', ');
	}

	result.code = -1;
	result.message = message;
	res.json(result);
};

exports.handle = function (res, err) {
	if (err)
		this.error(res, err);
	else
		this.success(res);
};