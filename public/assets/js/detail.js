
const urlData = getUrlParams(location.search);
console.log(urlData);
$.ajax({
    type : "GET",
    url : "/posts/" + urlData.id,
    success : function (response) {
        let html = template("articleTpl", response);
        $("#articleBox").html(html);
    },
    error : function (response) {
        console.log(response.responseText);
    }
});


// 文章点赞
$("#articleBox").on("click", "#like", function () {
    $.ajax({
        type : "POST", 
        url : "/posts/fabulous/" + urlData.id,
        success : function (response) {
            console.log(response);
            alert("点赞成功");
        }
    });
});

// 文章评论功能 （获取配置信息）
$.ajax({
    type : "get",
    url : "/settings",
    success : function (response) {
        if(response.comment){
            $(".comment").html(` <form id="commentForm">
            <textarea name="content"></textarea>
            <input type="submit" value="提交评论">
          </form>`);
        }
    },
    error : function (response) {
        console.log(response);
    }
});

$(".comment").on("submit", "#commentForm", function () {
    var formData = $(this).serializeObject();
    $.ajax({
        type : "get",
        url : "/settings",
        success : function (response) {
            console.log(response.review);
            $.ajax({
            type : "POST",
            url : "/comments",
            data : {
                content : formData.content,
                post : urlData.id,
                state : response.review ? 1 : 0,
            },
            success : function (response) {
                location.reload();
            },
            error : function (response) {
                console.log(response.responseText);
            }
        });
        }
    });
        

    return false;
})