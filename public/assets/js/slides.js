
// 添加轮播图功能
$("#bannerAddForm").on("submit", function () {
    var formData = $(this).serialize();
    $.ajax({
        type : "POST",
        url : "/slides",
        data : formData,
        success : function (response) {
            location.reload();
        },
        error : function (response) {
            console.log(response.responseText);
        }
    });

    return false;
});

// 当用户选择文件的时候
$('#avatar').on('change', function () {
	// 用户选择到的文件
	// this.files[0]
	var formData = new FormData();
	formData.append('image', this.files[0]);
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
            console.log($('#preview'));
            $('#preview').fadeIn(300);
			$('#preview').attr('src', response[0].image);
			$('#bannerImg').val(response[0].image);
		}
	})
});

// 获取轮播图列表
$.ajax({
    type : "GET",
    url : "/slides",
    success : function (response) {
        console.log(response);
        let html = template("bannerTpl", {data : response});
        $("#bannerList").html(html);
    },
    error : function (response) {
        console.log(response);
    }
});

// 删除轮播图
$("#bannerList").on('click', ".remove", function() {
    let id = $(this).attr("data-id");
    $.ajax({
        type : "DELETE",
        url : "/slides/" + id,
        success : function (response) {
            location.reload();
            
        },
        error : function (response) {
            console.log(response);
        }
    });
});