/**
 * Created by Leo on 14-11-12.
 */
$(function () {
	var ajax = new Ajax();

	var cb = function (result) {
		if (result.code === 0) {
			location.reload();
		} else {
			alert('操作失败');
		}
	};

	$('.sealUser').click(function () {
		var id = $(this).attr('_id');
		ajax.post('/users/' + id + '/seal', {}, cb);
	});

	$('.unsealUser').click(function () {
		var id = $(this).attr('_id');
		ajax.post('/users/' + id + '/unseal', {}, cb);
	});

	$('.grantUser').click(function () {
		var id = $(this).attr('_id');
		ajax.post('/users/' + id + '/grant', {}, cb);
	});
});