/**
 * Created by Leo on 14-11-10.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
	title: String,
	content: String,
	create_time: {type: Date, default: Date.now},
	update_time: {type: Date, default: Date.now},
	category: {type: Schema.ObjectId, ref: 'Category'},
	count: {type: Number, default: 0},
	sticky: {type: Number, default: 0},
	removed: {type: Boolean, default: false}
});