// 当表单发生提交行为的时候
$('#userForm').on('submit', function () {
	// 获取到用户在表单中输入的内容并将内容格式化成参数字符串
	var formData = $(this).serialize();
	// 向服务器端发送添加用户的请求
	$.ajax({
		type: 'post',
		url: '/users',
		data: formData,
		success: function () {
			// 刷新页面
			location.reload();
		},
		error: function () {
			alert('用户添加失败');
		}
	})
	// 阻止表单的默认提交行为
	return false;
});

// 当用户选择文件的时候
$('#modifyBox').on('change', '#avatar', function () {
	// 用户选择到的文件
	// this.files[0]
	var formData = new FormData();
	formData.append('avatar', this.files[0]);
	console.log(formData);

	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		// 告诉$.ajax方法不要解析请求参数
		processData: false,
		// 告诉$.ajax方法不要设置请求参数的类型
		contentType: false,
		success: function (response) {
			console.log(response)
			// 实现头像预览功能
			$('#preview').attr('src', response[0].avatar);
			$('#hiddenAvatar').val(response[0].avatar)
		}
	})
});

// 向服务器端发送请求 索要用户列表数据
$.ajax({
	type: 'get',
	url: '/users',
	success: function (response) {
		console.log(response)
		// 使用模板引擎将数据和HTML字符串进行拼接
		var html = template('users', { data: response });
		// 将拼接好的字符串显示在页面中
		$('#userList').html(html);
	}
});

// 通过事件委托的方式为编辑按钮添加点击事件
$('#userList').on('click', '.edit', function () {
	// 获取被点击用户的id值
	var id = $(this).attr('data-id');
	// 根据id获取用户的详细信息
	$.ajax({
		type: 'get',
		url : '/users/' + id,
		success: function (response) {
			console.log(response)
			var html = template('modifyTpl', response);
			$('#modifyBox').html(html);
		}
	})
});

// 为修改表单添加表单提交事件
$('#modifyBox').on('submit', '#userForm', function () {
	// 获取用户在表单中输入的内容
	var formData = $(this).serialize();
	// 获取要修改的那个用户的id值
	var id = $(this).attr('data-id');
	// 发送请求 修改用户信息
	$.ajax({
		type: 'put',
		url: '/users/' + id,
		data: formData,
		success: function (response) {
			// 修改用户信息成功 重新加载页面
			location.reload()
		}
	})
	// 阻止表单默认提交
	return false;
});

// 删除用户
$('#userList').on("click", ".deleteBtn", function () {
	console.log(1);
	var id = $(this).attr('data-id');
	let isConfirm = confirm("您确定要删除该用户吗?");
	if(isConfirm){
		$.ajax({
			type : "DELETE",
			url : "/users/" + id,
			success: function (response) {
				// 删除用户信息成功 重新加载页面
				location.reload()
			}
		});
	}
	
});

// 全选功能
	// 点击全选按钮 列表全部选中
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
	$("#userList").on("change", ".select", function () {
		// 循环遍历元素判断是否为全部选中
		// let bol;
		// $('.select').each(function(index, element) {
		// 	if($(this).is(':checked')){
		// 		bol = true;
		// 	}else{
		// 		bol = false;
		// 		return false;   // 结束循环
		// 	}
		// });
		// $("#selectAll").prop("checked",bol);
		
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

// 点击删除按钮	
$('#modifyBox').on('submit', '#userForm', function () {
	// 获取用户在表单中输入的内容
	var formData = $(this).serialize();
	// 获取要修改的那个用户的id值
	var id = $(this).attr('data-id');
	// 发送请求 修改用户信息
	$.ajax({
		type: 'put',
		url: '/users/' + id,
		data: formData,
		success: function (response) {
			// 修改用户信息成功 重新加载页面
			location.reload()
		}
	})
	// 阻止表单默认提交
	return false;
});

// 删除用户
$('#deletAll').on("click", function () {
	// 处理id格式
	let id = (function() {
		let id = "";
		// 获取所有被选中的用户 循环拼接id
		$('.select').filter(":checked").each(function (index, element) {
			id += $(this).attr('data-id') + "-";
		});
		return id.substr(0, id.length - 1);
	})();

	let isConfirm = confirm("您确定要删除该用户吗?");
	if(isConfirm){
		$.ajax({
			type : "DELETE",
			url : "/users/" + id,
			success: function (response) {
				// 删除用户信息成功 重新加载页面
				location.reload()
			}
		});
	}
	
});