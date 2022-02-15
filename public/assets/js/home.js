// 获取轮播图数据
$.ajax({
    type : "GET",
    url : "/slides",
    success : function (response) {
        let html = template("bannerTpl", {data : response});
        $("#bannerBox").html(html);

        // 轮播图执行代码
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function (index) {
            // index++;
    
            $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
        });
    
        // 上/下一张
        $('.swipe .arrow').on('click', function () {
            var _this = $(this);
    
            if(_this.is('.prev')) {
            swiper.prev();
            } else if(_this.is('.next')) {
            swiper.next();
            }
        })
    },
    error : function () {
        console.log(response.responseText);
    }
});

// 获取最新发布的数据
$.ajax({
    type : "GET",
    url : "/posts/lasted",
    success : function (response) {
        let html = template("newestTpl", {data : response});
        $("#newestBox").html(html);
    },
    error : function (response) {
        console.log(response.responseText);
    }
});


