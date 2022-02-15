jQuery.prototype.serializeObject=function(){  
    var obj=new Object();  
    $.each(this.serializeArray(),function(index,param){  
        if(!(param.name in obj)){  
            obj[param.name]=param.value;  
        }  
    });  
    return obj;  
};
// 获取文章列表
$.ajax({
    type : "get",
    url : "/posts",
    success : function (response) {
        console.log(response);
        let html = template("articleList", response);
        $("#articleBox").html(html);
        let pagehtml = template("pageTpl", response);
        $("#pageBox").html(pagehtml)
    },
    error : function (response) {
        console.log(response);
    }
});

// 处理日期执行函数 (方法重写)
function dateFormate(date) {
    date = new Date(date);
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' + date.getHours() + '时' + date.getMinutes() + '分';
}

// 获取分类列表
$.ajax({
    type : "get",
    url : "/categories",
    success : function (response) {
        var html = template('classifyList', { data: response });
        $('#classifyListBox').html(html);
    },
    error : function (response) {
        alert("获取分类列表失败")
    }
})

// 分页
function changePage (page) {
    let data = $("#filtrationForm").serializeObject();
    let obj = {};
    if(page){
        obj.page = page;
    }
    if(data.category != "false"){
        obj.category = data.category
    }
    if(data.state != "false"){
        obj.state = data.state
    }
    $.ajax({
        type : "get",
        url : "/posts",
        data: obj,
        success : function (response) {
            let html = template("articleList", response);
            $("#articleBox").html(html);  
            let pagehtml = template("pageTpl", response);
            $("#pageBox").html(pagehtml)
        },
        error : function (response) {
            console.log(response);
        }
    });
}


// 根据分类获取文章列表
$("#filtrationFormBox").on("submit", "#filtrationForm", function () {
    let data = $("#filtrationForm").serializeObject();
    let obj = {};
    if(data.category != "false"){
        obj.category = data.category
    }
    if(data.state != "false"){
        obj.state = data.state
    }
    $.ajax({
        type : "get",
        url : "/posts",
        data: obj,
        success : function (response) {
            let html = template("articleList", response);
            $("#articleBox").html(html);  
            let pagehtml = template("pageTpl", response);
            $("#pageBox").html(pagehtml)
        },
        error : function (response) {
            console.log(response);
        }
    });
    return false;
});

// 删除文章
$("#articleBox").on("click", ".remove", function () {
    let id = $(this).attr("data-id");
    let isConfirm = confirm("您确定要删除该文章吗?");
    if(isConfirm) {
        $.ajax({
            type : "DELETE",
            url : "/posts/" + id,
            success : function (response) {
                location.reload();
            },
            error : function (response) {
                console.log(response);
            }
        });
    }
});