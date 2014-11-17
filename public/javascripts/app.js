/**
 * Created by Leo on 14-11-12.
 */

function Ajax() {
}

Ajax.prototype = {

	ajax: function (url, type, data, successfn) {
		$.ajax({
			url: url,
			type: type,
			data: data,
			dataType: "JSON",
			success: successfn,
			err: function (err) {
				alert("操作失败");
			}
		});
	},

	get: function (url, data, successfn) {
		this.ajax(url, "GET", data, successfn);
	},

	put: function (url, data, successfn) {
		this.ajax(url, "PUT", data, successfn);
	},

	post: function (url, data, successfn) {
		this.ajax(url, "POST", data, successfn);
	},

	delete: function (url, successfn) {
		this.ajax(url, "DELETE", {}, successfn);
	}
}

$(function () {
	$('#loginBox').modal({show: true});
	var ajax = new Ajax();

	$('#feedbackSubmit').click(function () {
		var data = {
			email: $('#feedbackEmail').val(),
			qq: $('#feedbackQQ').val(),
			feedback: $('#feedback').val()
		};
		ajax.post('/feedbacks', data, function (result) {
			if (result.code == 0) {
				$('#feedbackError').text('提交成功, 感谢您的反馈');
				$('#feedbackSubmit').attr('disabled', 'disabled');
			} else {
				$('#feedbackError').text(result.message);
			}
		});
	});

	$('#commentSubmit').click(function () {
		var blogId = $('#blogId').val();
		var data = {
			body: $('#comment').val()
		};
		ajax.post('/blogs/' + blogId + '/comments', data, function (result) {
			if (result.code == 0) {
				location.reload();
			} else {
				$('#commentError').text(result.message);
			}
		});
	});

});