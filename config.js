/**
 * Created by Leo on 14-11-10.
 */

process.env['port'] = 80;
process.env['env'] = 'development';

module.exports = {
	db: 'mongodb://localhost/blog'
}