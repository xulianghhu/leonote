/**
 * Created by Leo on 14-11-13.
 */

$(function () {

	var ajax = new Ajax();

	// 点击类别下拉框
	$('#categoryList li').click(function () {
		$('#categoryName').val($(this).text());
		$('#categoryId').val($(this).attr('_id'));
	});

	$('#blogSubmit').click(function () {
		var id = $('#blogId').val();
		var data = {
			title: $('#blogTitle').val(),
			category: $('#categoryId').val(),
			content: UE.getEditor('myEditor').getContent()
		};

		var cb = function (result) {
			if (result.code == 0) {
				location.href = '/blogs/' + (id != 'null' ? id : result.message);
			} else {
				$('#blogError').text(result.message);
			}
		};

		// 更新博客
		if (id != 'null') {
			ajax.put('/blogs/' + id, data, cb);
		}
		// 新建博客
		else {
			ajax.post('/blogs', data, cb);
		}
		return false;
	});

	var callback = function (result) {
		if (result.code == 0) {
			location.href = '/blogs';
		} else {
			alert(result.message);
		}
	};

	/**
	 * 删除
	 */
	$('.removeBlog').click(function () {
		var that = $(this);
		var id = that.attr('_id');
		ajax.delete('/blogs/' + id, callback);
	});

	/**
	 * 还原,取消置顶
	 */
	$('.reduceBlog').click(function () {
		var that = $(this);
		var id = that.attr('_id');
		ajax.post('/blogs/' + id + '/reduce', {}, callback);
	});

	/**
	 * 置顶
	 */
	$('.stickBlog').click(function () {
		var that = $(this);
		var id = that.attr('_id');
		ajax.post('/blogs/' + id + '/stick', {}, callback);
	});


});