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
	status: {type: Number, default: 0},
	comments: [
		{
			body: { type: String, default: '' },
			user: { type: Schema.ObjectId, ref: 'User' },
			create_time: { type: Date, default: Date.now }
		}
	]
});

BlogSchema.path('title').validate(function (title) {
	return title.trim().length;
}, '标题不能为空');

BlogSchema.path('category').required(true, '必须选择类别');

BlogSchema.virtual('createTime').get(function () {
	return this.create_time.format("yyyy年MM月dd日");
});

BlogSchema.statics = {
	load: function (id, cb) {
		this.findOne({ _id: id })
				.populate('author', 'email username')
				.populate('category', 'name')
				.populate('comments.user')
				.exec(cb);
	}
};

mongoose.model('Blog', BlogSchema);