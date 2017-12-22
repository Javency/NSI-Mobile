//搜索框划过显示消失
function searchScroll() {
    $(window).scroll(function () {
        if($(this).scrollTop()>100){
            $('#scroll01').addClass('hide')
            $('#scroll02').removeClass('hide')
            $('.siteHeader').animate({
                opacity:0.8
            },0)
        }else {
            $('#scroll01').removeClass('hide')
            $('#scroll02').addClass('hide')
            $('.siteHeader').animate({
                opacity:1
            },0)
        }
    })
}

//封装ajax
function myAjax( data,url,success) {
    $.ajax({
        type : "get",
        async:true,
        traditional :true,
        data: data,//提交的参数
        url:url,
        dataType : "jsonp",//数据类型为jsonp  
        jsonp: "Callback",//服务端用于接收callback调用的function名的参数  
        success : function(msg){
            console.log(msg)
            success(msg);
            $("html,body").animate({scrollTop:0}, 0);
        },
        error:function(){
            alert('发生错误，请求数据失败！');
        }
    });
}

//登录后的导航条状态
$(function () {
    console.log($.cookie('usertitle'))
    console.log($.cookie('username'))
    if($.cookie('usertitle') && $.cookie('username') ){
        //导航条登录显示控制
        $('#noLogin').addClass('hide')
        $('#login').removeClass('hide')
    }else {
        // alert(2)
        $('.rightNav li').eq(1).css('display','block')
        $('.rightNav li').eq(2).css('display','block')
        $('.rightNav li').eq(3).css('display','none')
        $('.rightNav li').eq(4).css('display','none')
    }
})



