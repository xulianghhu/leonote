/**
 * Created by Leo on 14-11-12.
 */
$(function () {
	var ajax = new Ajax();

	$('.sealUser').click(function () {
		var id = $(this).attr('_id');
		ajax.post('/users/' + id + '/seal', {}, function (result) {
			if (result.code === 0) {
				location.reload();
			} else {
				alert('操作失败');
			}
		});
	});

	$('.unsealUser').click(function () {
		var id = $(this).attr('_id');
		ajax.post('/users/' + id + '/unseal', {}, function (result) {
			if (result.code === 0) {
				location.reload();
			} else {
				alert('操作失败');
			}
		});
	});
});