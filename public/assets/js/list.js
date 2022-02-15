const urlData = getUrlParams(location.search);
// 获取最新发布的数据
$.ajax({
    type : "GET",
    url : "/posts/category/" + urlData.id,
    success : function (response) {
        let newestTpl = `
        <h3>{{data[0].category.title}}</h3>
        {{each data}} 
        <div class="entry">
            <div class="head">
            <a href="detail.html?id={{$value._id}}">{{$value.title}}</a>
            </div>
            <div class="main">
            <p class="info">{{$value.author.nickName}} 发表于 {{$imports.dateFormate($value.updateAt)}}</p>
            <p class="brief">{{$value.content.substr(0, 180)}}...</p>
            <p class="extra">
                <span class="reading">阅读({{$value.meta.views}})</span>
                <span class="comment">评论({{$value.meta.comments}})</span>
                <a href="javascript:;" class="like">
                <i class="fa fa-thumbs-up"></i>
                <span>赞({{$value.meta.likes}})</span>
                </a>
                <a href="javascript:;" class="tags">
                分类：<span>{{$value.category.title}}</span>
                </a>
            </p>
            <a href="javascript:;" class="thumb">
                <img src={{$value.thumbnail}} alt="">
            </a>
            </div>
        </div>
        {{/each}}
        `
        let html = template.render(newestTpl, {data : response});
        $("#newestBox").html(html);
    },
    error : function (response) {
        console.log(response.responseText);
    }
});