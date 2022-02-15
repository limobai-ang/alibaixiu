// 获取热推荐数据
$.ajax({
    type : "GET",
    url : "/posts/recommend",
    success : function (response) {
        let hotsTpl = `
            {{each data}} 
            <li>
            <a href="./detail.html?id={{$value._id}}">
                <img src={{$value.thumbnail}} alt="">
                <span>{{$value.title}}</span>
            </a>
            </li>
            {{/each}}
        `;
        let html = template.render(hotsTpl, {data : response});
        $("#hotsBox").html(html);
    },
    error : function (response) {
        console.log(response.responseText);
    }
});

// 获取随机文章数据
$.ajax({
    type : "GET",
    url : "/posts/random",
    success : function (response) {
        console.log(response);
      let randomTpl = `
            {{each data}}
            <li>
            <a href="detail.html?id={{$value._id}}">
                <p class="title">{{$value.title.substr(0, 20)}}...</p>
                <p class="reading">阅读(819)</p>
                <div class="pic">
                <img src={{$value.thumbnail}} alt="">
                </div>
            </a>
            </li>
            {{/each}}
        `;
        let html = template.render(randomTpl, {data : response});
        $("#randomBox").html(html);
    },
    error : function (response) {
        console.log(response.responseText);
    }
});

// 获取最新评论
$.ajax({
    type : "GET",
    url : "/comments/lasted",
    success : function (response) {
        let commentTpl = `
            {{each data}}
            <li>
                <a href="javascript:;">
                <div class="avatar">
                    <img src={{$value.author.avatar}} alt="">
                </div>
                <div class="txt">
                    <p>
                    <span>{{$value.author.nickName}}</span>{{$imports.dateFormate($value.createAt)}}说:
                    </p>
                    <p>{{$value.content}}</p>
                </div>
                </a>
            </li>
            {{/each}}
        `;
        let html = template.render(commentTpl, {data : response});
        $("#commentBox").html(html);
    },
    error : function (response) {
        console.log(response.responseText);
    }
});

// 获取分类数据
$.ajax({
    type : "GET",
    url : "/categories",
    success : function (response) {
        let navTpl =  `
            {{each data}}
            <li><a href="list.html?id={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
            {{/each}}
        `;
        let html = template.render(navTpl, {data : response});
        $("#navBox").html(html);
        $("#navTopBox").html(html);
    },
    error : function (response) {
        console.log(response.responseText);
    }
});


// 时间处理函数
function dateFormate(date) {
    date = new Date(date);
    return date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? '0' +(date.getMonth() + 1) : '' + (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
  }


// url 地址参数转为对象
function getUrlParams (search) {
    if(search) {
        return JSON.parse("{\"".concat(decodeURIComponent(search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"'), "\"}"));
    }else{
        return {};
    }
  }


  // 获取表单内容转为对象格式
jQuery.prototype.serializeObject=function(){  
    var obj=new Object();  
    $.each(this.serializeArray(),function(index,param){  
        if(!(param.name in obj)){  
            obj[param.name]=param.value;  
        }  
    });  
    return obj;  
  };