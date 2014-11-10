/**
 * Created by Leo on 14-11-10.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CatetorySchema = new Schema({
	name: String,
	create_time: {type: Date, default: Date.now},
	priority: {type: Number, default: 0}
});

CatetorySchema.path('name').validate(function (name) {
	return name.trim().length;
}, '类别名不能为空');

CatetorySchema.path('name').validate(function (name, fn) {
	var Category = mongoose.model('Category');

	Category.find({ name: name }).exec(function (err, categories) {
		fn(!err && categories.length === 0);
	});
}, '类别名已存在');

mongoose.model('Category', CatetorySchema);

