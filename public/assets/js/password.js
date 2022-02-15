// 当表单发生提交行为的时候
$('#passwordForm').on('submit', function () {
    // 获取到用户在表单中输入的内容并将内容格式化成参数字符串
    var formData = $(this).serialize();
    // 向服务器端发送添加用户的请求
    $.ajax({
      type: 'put',
      url: '/users/password',
      data: formData,
      success: function (response) {
        $('#promptMessage').addClass('alert-success') .removeClass('alert-danger');
        $('#promptMessage').stop(true,true).fadeIn(300);
        var html = template('passwordSuccess', response);
        $('#promptMessage').html(html);
        let i = 3;
        setInterval(function() {
            i --; 
            if(!i){
                // 跳转到登录页重新登录
                location.href = "/admin/login.html";
                return;
            }
            $('#time').html(i);
        }, 1000);
      },
      error: function (response) {
        $('#promptMessage').addClass('alert-danger') .removeClass('alert-success ');
        $('#promptMessage').stop(true,true).fadeIn(300);
          var html = template('passwordErr', JSON.parse(response.responseText));
          $('#promptMessage').html(html);
      }
    })
    // 阻止表单的默认提交行为
    return false;
});