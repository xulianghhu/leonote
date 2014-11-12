/**
 * Created by Leo on 14-11-10.
 */
$(function () {
	var ajax = new Ajax();

	$('.removeCategory').click(function () {
		var that = $(this);
		var id = that.attr('_id');
		ajax.delete('/categories/' + id, function (result) {
			if (result.code == 0) {
				that.parent().parent().parent().remove();
			} else {
				alert(result.message);
			}
		});
	});


	$('#categorySubmit').click(function () {
		var id = $('#categoryId').val();
		var data = {
			name: $('#categoryName').val(),
			priority: $('#categoryPriority').val()
		};

		var cb = function (result) {
			if (result.code == 0) {
				location.href = '/categories';
			} else {
				$('#categoryError').text(result.message);
			}
		};

		// 更新类别
		if (id != 'null') {
			ajax.put('/categories/' + id, data, cb);
		}
		// 新建类别
		else {
			ajax.post('/categories', data, cb);
		}
	});
});