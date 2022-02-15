// 退出登录功能
$("#logout").on('click', function () {
  let isConfirm = confirm("您确定要退出吗?");
  if(isConfirm){
    $.ajax({
      type : "post",
      url : "/logout",
      success : function () {
        location.href = "/admin/login.html"
      },
      error : function () {
        console.log('退出失败');
      }
      
    });
  }
});

// 时间处理函数
function dateFormate(date) {
  date = new Date(date);
  return date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? '0' +(date.getMonth() + 1) : '' + (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + 'T' + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? "0" +  date.getMinutes() : date.getMinutes());
}

// 获取登录id    (在html文件的最上方设置的登录拦截 访问过/login/status 返回的有userId)
$.ajax({
  type : "GET",
  url : "/users/" + userId,
  success : function (response) {
    console.log(response);
    if(response.avatar){
      $(".avatar").attr("src", response.avatar);  
    }
    $(".name").html(response.nickName);
  },
  error : function (response) {
    console.log(response.responseText);
  }
  
});

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