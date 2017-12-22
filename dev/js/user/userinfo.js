//我的基本信息
$(function () {
    $.ajax({
        type:"get",
        async:false,
        traditional :true,
        data: {
            UserName:$.cookie('username')
        },//提交的参数
        url:'http://'+changeUrl.address+'/User_api?whereFrom=UserInfo',
        dataType : "jsonp",//数据类型为jsonp  
        jsonp: "Callback",//服务端用于接收callback调用的function名的参数  
        success : function(msg){
            console.log(msg)
            $('.User_TureName').text(msg[0].User_TureName)
            $('#Member_sign').text(msg[0].Member_sign)
            $('#User_score').text(msg[0].User_score)
            $('#name').text(msg[0].name)
            $('#User_phone').text(msg[0].User_phone)
        },
        error:function(){
            alert('发生错误，请求数据失败！');
        }
    });
})



//退出登录，删除cookie
function exitLogin() {
    $.cookie('usertitle', null , { expires: -1, path: '/'  });
    $.cookie('username',null , { expires: -1 ,path: '/'});
    $.cookie('User_TureName', null , { expires: -1 ,path: '/'});
    $.cookie('userVerifyCode', null , { expires: -1 ,path: '/'});
    window.location.href = '../index.html'
}
//退出登录
$('#exitLogin').click(function () {
    exitLogin()
})


