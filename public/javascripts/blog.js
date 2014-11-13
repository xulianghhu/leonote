/**
 * Created by Leo on 14-11-13.
 */

$(function () {
	// 点击类别下拉框
	$('#categoryList li').click(function () {
		$('#categoryName').val($(this).text());
		$('#categoryId').val($(this).attr('_id'));
	});
});