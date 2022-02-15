// 获取分类添加到页面中
$(function () {
    $.ajax({
        type : "GET",
        url : "/categories",
        success : function(response) {
            let html = template("calssify", {data : response});
            $("#category").html(html);
        },
        error : function (response) {
            console.log(response.responseText);
        }
    });
});

// 文章封面处理
$("#feature").on("change", function () {
    // 获取到管理员选择到的文件
    let file = this.files[0];
    // 创建formData对象 实现二进制文件上传
    var formData = new FormData();
    // 将管理员选择到的文件追加到formData对象中
    formData.append('cover', file);
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
            $('.thumbnail').attr('src', response[0].cover);
            $('.thumbnail').stop(true,true).fadeIn(300);
            $("#thumbnailValue").val(response[0].cover);
        },
        error : function (response) {
            console.log(response.responseText);
        }
    });
});

// 创建文章
$("#articleForm").on("submit", function () {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // 添加
    console.log(formData);
    $.ajax({
        type : "POST",
        url : "/posts",
        data : formData,
        success : function (response) {
            location.href = "/admin/posts.html";
        },
        error : function (response) {
            console.log(response);
        }
    });
    return false;
})

const urlData = getUrlParams(location.search);
if(urlData.id){
    $.ajax({
        type : "GET",
        url : "/posts/" + urlData.id,
        success : function (response) {
            // 获取分类列表
            $.ajax({
                type : "GET",
                url : "/categories",
                success : function(answer) {     // answer 为了和第一个response区分命名
                    response.answer = answer;
                    console.log(response);
                    response.updateAt = dateFormate(response.updateAt);     // dateFormate 公共文件中存储的方法
                    let html = template("amendTpl", response);
                    $("#formBOX").html(html);
                },
                error : function (answer) {
                    console.log(answer.responseText);
                }
            });
        },
        error : function (response) {
            
        }
    });

    // 修改文章
    $("#formBOX").on("submit", "#articleFormAmend", function () {
        console.log(urlData.id);
        // 获取用户在表单中输入的内容
        var formData = $(this).serialize();
        // 添加
        console.log(formData);
        $.ajax({
            type : "PUT",
            url : "/posts/" + urlData.id,
            data : formData,
            success : function (response) {
                location.href = "/admin/posts.html";
            },
            error : function (response) {
                console.log(response);
            }
        });
        return false;
    });
};

