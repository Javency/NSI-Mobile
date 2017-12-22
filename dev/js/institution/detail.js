//获取url地址问号后面部分
function getQueryStringArgs() {
    var qs= location.search.length > 0 ? location.search.substring(1) : '',
        args = {},
        items = qs.length ? qs.split('&') : [],
        item = null,
        name = null,
        value = null,
        i = 0,
        len = items.length;
    for( i=0;i<len;i++){
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        name = item[0];
        value = item[1];

        if (name.length){
            args[name] = value;
        }
    }
    return args;
}

//获取机构ID
var args =getQueryStringArgs();
var datailSchool = decodeURIComponent(args['School_name'])

//过滤函数（如果为零，自动补空，地址用）
function zeroToAddress( str ) {
    var strFilter = null;
    return strFilter = (str == 0)? '' : str;
}
//过滤函数（如果为零，自动补暂无）
function zeroToEmpty( str ) {
    var strFilter = null;
    return strFilter = (str == 0)? '  ' : str;
}

$(function () {
    $.ajax({
        type:"get",
        async:false,
        traditional :true,
        data: {
            'Id': datailSchool
        },//提交的参数
        url:'http://'+changeUrl.address+'/Institution_api?whereFrom=detail',
        dataType : "jsonp",//数据类型为jsonp  
        jsonp: "Callback",//服务端用于接收callback调用的function名的参数  
        success : function(msg){
            console.log(msg)
            var imgSrc = msg[0].Institution_logo ? (msg[0].Institution_logo !=0 ? 'http://'+changeUrl.imgAddress+msg[0].Institution_logo : '../assets/img/schoolNoPic.png') : '../assets/img/schoolNoPic.png';

            // $('#institutionLogo').attr('src',imgSrc)

            $('#Name').text(zeroToEmpty(msg[0].Name))
            $('#instutionLable').text(zeroToEmpty(msg[0].Label))
            $('#companyType').text(zeroToEmpty(msg[0].Type))

            $('#Areas').text(zeroToEmpty(msg[0].Areas))
            $('#Areas02').text(zeroToAddress(msg[0].Areas02))
            $('#Areas03').text(zeroToAddress(msg[0].Areas03))
            $('#Website').text(zeroToEmpty(msg[0].Website))
            $('#Founded_time').text(zeroToEmpty(msg[0].Founded_time))
            $('#Service').text(zeroToEmpty(msg[0].Service))

            $('#ContactName').text(zeroToEmpty(msg[0].ContactName))
            $('#ContactPosition').text(zeroToEmpty(msg[0].ContactPosition))
            $('#ContactPhone').text(zeroToEmpty(msg[0].ContactPhone))
            $('#ContactMail').text(zeroToEmpty(msg[0].ContactMail))

            $('#Investment').text(zeroToEmpty(msg[0].Investment))
            $('#Remark').text(zeroToEmpty(msg[0].Remark))
            $('#ServedSchool').text(zeroToEmpty(msg[0].ServedSchool))
            $('#Introduction').text(zeroToEmpty(msg[0].Introduction))

            //机构网址(先判断是否只有http)
            website = msg[0].Website.substr(0,7).toLowerCase() == "http://" ? msg[0].Website : "http://" + msg[0].Website;
            $('#Website').attr('href',website)
            //机构ID
            $('#headerInstutionID').text(msg[0].Id)
        },
        error:function(){
            alert('发生错误，请求数据失败！');
        }
    });
})
