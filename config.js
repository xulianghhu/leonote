/**
 * Created by Leo on 14-11-10.
 */

process.env['port'] = 80;
process.env['env'] = 'production';

module.exports = {
	db: 'mongodb://localhost/blog'
}