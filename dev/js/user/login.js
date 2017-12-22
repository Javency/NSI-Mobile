//判断浏览器是否支持cookie
$(function () {
    console.log( 'Cookies启用：'+navigator.cookieEnabled );
    if(navigator.cookieEnabled == false){
        $('#isCookie').removeClass('hide')
    }else {
        $('#isCookie').addClass('hide')
    }
})

//用户登录
function userLogin() {
    var username = $('#username').val()
    var password = $('#password').val()
    var data = {
        'username':username,
        'pwd':password
    }
    $.ajax({
        type:"get",
        async:false,
        traditional :true,
        data: data,//提交的参数
        url: 'http://'+changeUrl.address+'/User_api?whereFrom=login',
        dataType : "jsonp",//数据类型为jsonp  
        jsonp: "Callback",//服务端用于接收callback调用的function名的参数  
        success : function(msg){
            console.log(msg);
            if(msg.member_sign > 0){
                $.cookie('usertitle', msg.member_sign , { expires: 1, path: '/' });
                $.cookie('username', msg.username , { expires: 1 ,path: '/'});
                $.cookie('User_TureName', msg.User_TureName , { expires: 1 ,path: '/'});
                $.cookie('userVerifyCode', msg.UserVerifyCode , { expires: 1 ,path: '/'});
                console.log( $.cookie('usertitle'))
                console.log( $.cookie('username'))  //邮箱地址
                console.log( $.cookie('userVerifyCode'))
                console.log( $.cookie('User_TureName'))  //真实姓名
                window.location.href = "../index.html";
            }else if(msg.member_sign == -2){
                alert('用户名或密码错误')
            }else if(msg.member_sign == -1){
                alert('邮箱未激活')
            }else if(msg.member_sign == 0){
                alert('账号未审核')
            }
        },
        error:function(){
            alert('用户名或密码错误，请求数据失败！');
        }
    });
}

//用户登录
$('#login').click(function () {
    userLogin()
})


