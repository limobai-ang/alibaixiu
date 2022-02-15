// 获取文章数量
$.ajax({
    type : "get",
    url : "/posts/count", 
    success : function (response) {
        $("#postCount").html(response.postCount);
        $("#draftCount").html(response.draftCount);
    },
    error : function (response) {
        console.log(response.responseText);
    }
});

// 获取分类数量
$.ajax({
    type : "get",
    url : "/categories/count", 
    success : function (response) {
        $("#categoryCount").html(response.categoryCount);
    },
    error : function (response) {
        console.log(response.responseText);
    }
});

// 获取评论数量
$.ajax({
    type : "get",
    url : "/comments/count", 
    success : function (response) {
        $("#commentCount").html(response.commentCount);
    },
    error : function (response) {
        console.log(response.responseText);
    }
});
