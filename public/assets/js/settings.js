$("#formBox").on("submit", "#dataForm", function () {
    let formData = $(this).serialize();
    console.log(formData);
    $.ajax({
        type : "POST",
        url : "/settings",
        data : formData,
        success : function (response) {
            location.reload();
        },
        error : function (response) {
            console.log(response);
        }
    });
    return false;
});

// 上传图片
$("#feature").on("change", function () {
    // 获取到管理员选择到的文件
    let file = this.files[0];
    // 创建formData对象 实现二进制文件上传
    var formData = new FormData();
    // 将管理员选择到的文件追加到formData对象中
    formData.append('logo', file);
    // console.log(formData.get('cover'));   // 直接打印formData是空的

    // 文章封面上传
    $.ajax({
        type : "POST",
        url : "/upload", 
        data : formData,
        // 告诉$.ajax方法不要解析请求参数
		processData: false,
		// 告诉$.ajax方法不要设置请求参数的类型
		contentType: false,
        success : function (response) {
            console.log(response);
            $("#logoBlock").attr('src', response[0].logo);
            // $('.thumbnail').stop(true,true).fadeIn(300);
            $("#logoUrl").val(response[0].logo);
        },
        error : function (response) {
            console.log(response.responseText);
        }
    });
});

// 获取表单数据
$.ajax({
    type : "GET",
    url : "/settings",
    success : function (response) {
        console.log(response);
       if(response){
        let html = template("FormTpl", response);
        $("#formBox").html(html);
       }
    },
    error : function (response) {
        console.log(response);
    }
});