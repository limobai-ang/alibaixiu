// 实现添加分类功能
$('#classifyForm').on("submit", function () {
    var formData = $(this).serialize();
    $.ajax({
		type: 'post',
		url: '/categories',
		data: formData,
		success: function (response) {
			$('#err').stop(true,true).fadeOut(300);
			location.reload();
		},
		error: function (response) {
			$('#err').stop(true,true).fadeIn(300);
            $('#err').html('<strong>错误！</strong>' + JSON.parse(response.responseText).message)
		}
	})
    return false;
});

// 获取分类数据渲染到页面
$(function() {
	$.ajax({
		type : "get",
		url : "/categories",
		success : function (response) {
			console.log(response);
			var html = template('classifyList', { data: response });
			$('#classifyListBox').html(html);
		},
		error : function (response) {
			alert("获取分类列表失败")
		}
	})
});

// 点击全选按钮全部选中
$("#selectAll").on("change", function () {

	if($('#selectAll').is(':checked')){
		// 显示批量删除按钮
		$("#deletAll").stop(true,true).fadeIn(300);
	}else{
		// 隐藏批量删除按钮
		$("#deletAll").stop(true,true).fadeOut(300);
	}
	$(".select").prop("checked",$('#selectAll').is(':checked'));
});

// 列表全部选中 全选按钮属于选中状态
$("#classifyListBox").on("change", ".select", function () {
	// filter() 过滤出所有为选中状态的按钮 按钮的数量等于选中按钮的数量相等 代表全部选中
	if($('.select').length == $('.select').filter(":checked").length) {
		$("#selectAll").prop("checked", true);
	}else{
		$("#selectAll").prop("checked", false);
	}
	// 只要有被选中的按钮 就显示全部删除按钮
	if($('.select').filter(":checked").length){
		$("#deletAll").stop(true,true).fadeIn(300);
	}else{
		$("#deletAll").stop(true,true).fadeOut(300);
	}
});

// 通过事件委托的方式为编辑按钮添加点击事件
$('#classifyListBox').on('click', '.edit', function () {
	// 获取被点击用户的id值
	var id = $(this).attr('data-id');
	// 根据id获取用户的详细信息
	$.ajax({
		type: 'get',
		url : '/categories/' + id,
		success: function (response) {
			console.log(response)
			var html = template('modifyTpl', response);
			$('#classifyFormBox').html(html);
		}
	})
});

// 编辑目录
$('#classifyFormBox').on('submit', '#classifyFormModif', function () {
	// 获取用户在表单中输入的内容
	var formData = $(this).serialize();
	// 获取要修改的id值
	var id = $(this).attr('data-id');
	// 发送请求 修改信息
	$.ajax({
		type: 'put',
		url: '/categories/' + id,
		data: formData,
		success: function (response) {
			// 修改用户信息成功 重新加载页面
			location.reload()
		},
		error : function (response) {
			console.log(response.responseText);
		}
	})
	// 阻止表单默认提交
	return false;
});

// 删除用户
$('#classifyListBox').on("click", ".deleteBtn", function () {
	var id = $(this).attr('data-id');
	let isConfirm = confirm("您确定要删除该用户吗?");
	if(isConfirm){
		$.ajax({
			type : "DELETE",
			url : "/categories/" + id,
			success: function (response) {
				// 删除用户信息成功 重新加载页面
				location.reload()
			}
		});
	}
	
});



// // 删除选中用户
$('#deletAll').on("click", function () {
	// 处理id格式
	let id = (function() {
		let id = "";
		// 获取所有被选中的用户 循环拼接id
		$('.select').filter(":checked").each(function (index, element) {
			id += $(element).attr('data-id') + "-";
		});
		return id.substr(0, id.length - 1);
	})();

	let isConfirm = confirm("您确定要删除分类吗?");
	if(isConfirm){
		$.ajax({
			type : "DELETE",
			url : "/categories/" + id,
			success: function (response) {
				// 删除用户信息成功 重新加载页面
				location.reload()
			}
		});
	}
});