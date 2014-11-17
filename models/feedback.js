/**
 * Created by Leo on 14-11-17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
	email: { type: String, default: '' },
	qq: { type: String, default: '' },
	create_time: {type: Date, default: Date.now},
	user: {type: Schema.ObjectId, ref: 'User'},
	feedback: {type: String, default: ''}
});

FeedbackSchema.path('feedback').validate(function (feedback) {
	return feedback.trim().length;
}, '反馈信息不能为空');

FeedbackSchema.virtual('createTime').get(function () {
	return this.create_time.format("yyyy-MM-dd hh:mm:ss");
});

mongoose.model('Feedback', FeedbackSchema);