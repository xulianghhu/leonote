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

});