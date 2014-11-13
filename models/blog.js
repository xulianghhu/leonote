/**
 * Created by Leo on 14-11-13.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
	title: String,
	content: String,
	author: {type: Schema.ObjectId, ref: 'User'},
	create_time: {type: Date, default: Date.now},
	update_time: {type: Date, default: Date.now},
	category: {type: Schema.ObjectId, ref: 'Category'},
	count: {type: Number, default: 0},
	status: {type: Number, default: 0}
});

BlogSchema.path('title').validate(function (title) {
	return title.trim().length;
}, '标题不能为空');

mongoose.model('Blog', BlogSchema);