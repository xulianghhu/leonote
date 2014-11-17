/**
 * Created by Leo on 14-11-10.
 */

var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: { type: String, default: '' },
	username: { type: String, default: '' },
	hashed_password: { type: String, default: '' },
	salt: { type: String, default: '' },
	status: { type: Number, default: 0 },
	create_time: {type: Date, default: Date.now}
});

/**
 * 虚拟属性
 */
UserSchema
		.virtual('password')
		.set(function (password) {
			this._password = password;
			this.salt = this.makeSalt();
			this.hashed_password = this.encryptPassword(password);
		})
		.get(function () {
			return this._password;
		});
UserSchema.virtual('createTime').get(function () {
	return this.create_time.format("yyyy-MM-dd hh:mm:ss");
});

UserSchema.path('email').validate(function (email) {
	return email.trim().length;
}, '邮箱不能为空');

UserSchema.path('email').validate(function (email, fn) {
	var User = mongoose.model('User');

	User.find({ email: email}).exec(function (err, users) {
		fn(!err && users.length === 0);
	});
}, '邮箱已被使用');

UserSchema.path('hashed_password').validate(function (hashed_password) {
	return hashed_password.length;
}, '密码不能为空');

UserSchema.path('username').validate(function (username) {
	return username.trim().length;
}, '昵称不能为空');

UserSchema.path('username').validate(function (username, fn) {
	var User = mongoose.model('User');

	User.find({ username: username}).exec(function (err, users) {
		fn(!err && users.length === 0);
	});
}, '昵称已被使用');

/**
 * 方法
 */
UserSchema.methods = {
	authenticate: function (plainText) {
		return this.encryptPassword(plainText) === this.hashed_password;
	},

	makeSalt: function () {
		return Math.round((new Date().valueOf() * Math.random())) + '';
	},

	encryptPassword: function (password) {
		if (!password) return '';
		try {
			return crypto
					.createHmac('sha1', this.salt)
					.update(password)
					.digest('hex');
		} catch (err) {
			return '';
		}
	}
}

mongoose.model('User', UserSchema);