// $.ajax({
//     type : "POST",
//     url : "/comments",
//     data : {
//         content : "测试评论 " + i,
//         post : "609a93929f3b0f3f4cd3171b",
//         state : 0,
//     },
//     success : function (response) {
//         console.log(response);
//     },
//     error : function (response) {
//         console.log(response);
//     }
// });


$.ajax({
    type : "GET",
    url : "/comments",
    success : function (response) {
        console.log(response);
        let html = template("commentTpl", response);
        $("#commentBox").html(html);
        let htmlPage = template("pageTpl", response);
        $("#pageBox").html(htmlPage);
    },
    error : function (response) {
        console.log(response);
    }
});

function dataPage (page) {
    $.ajax({
        type : "GET",
        url : "/comments",
        data : {
            page : page
        },
        success : function (response) {
            let html = template("commentTpl", response);
            $("#commentBox").html(html);
            let htmlPage = template("pageTpl", response);
            $("#pageBox").html(htmlPage);
        },
        error : function (response) {
            console.log(response);
        }
    });
}

$("#commentBox").on("click", ".amend", function () {
    let id = $(this).attr("data-id");
    let state = $(this).attr("data-state");
    $.ajax({
        type : "PUT",
        url : "/comments/" + id,
        data : {
            state : state == 1 ? state = 0 : state = 1,
        },
        success : function (response) {
            location.reload();
            // console.log(response);
        }
    });
});

// 删除评论
$("#commentBox").on("click", ".remove", function () {
    let id = $(this).attr("data-id");
    let isConfirm = confirm("您确定要退出吗?");
    if(isConfirm) {
        $.ajax({
            type : "DELETE",
            url : "/comments/" + id,
            success : function (response) {
                location.reload();
            },
            error : function (response) {
                console.log(response.responseText);
            }
        });
    }
});

// 处理日期执行函数 (方法重写)
function dateFormate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
}