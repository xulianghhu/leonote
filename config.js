/**
 * Created by Leo on 14-11-10.
 */

process.env['PORT'] = 3000;
process.env['ENV'] = 'production';

module.exports = {
	db: 'mongodb://localhost/blog'
};