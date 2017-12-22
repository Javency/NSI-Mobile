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

//获取学校ID
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
        url:'http://'+changeUrl.address+'/School_api?whereFrom=detail',
        dataType : "jsonp",//数据类型为jsonp  
        jsonp: "Callback",//服务端用于接收callback调用的function名的参数  
        success : function(msg){
            console.log(msg)
            var imgSrc = msg[0].School_logo ? 'http://'+changeUrl.imgAddress+msg[0].School_logo : '../images/public/nsi_nopic.png';
            $('#School_logo').attr('src',imgSrc)
            $('#School_name').text(zeroToEmpty(msg[0].School_name))
            $('#School_EnglishName').text(zeroToEmpty(msg[0].School_EnglishName))
            $('#School_properties').text(zeroToEmpty(msg[0].School_properties))
            $('#OperationState').text(zeroToEmpty(msg[0].OperationState))

            $('#Areas').text(zeroToEmpty(msg[0].Areas))
            $('#Areas02').text(zeroToAddress(msg[0].Areas02))
            $('#Areas03').text(zeroToAddress(msg[0].Areas03))
            $('#Website').text(zeroToEmpty(msg[0].Website))
            $('#Telephone').text(zeroToEmpty(msg[0].Telephone))
            $('#School_system').text(zeroToEmpty(msg[0].School_system))
            $('#Founded_time').text(zeroToEmpty(msg[0].Founded_time))
            $('#TuitionHigh').text(zeroToEmpty(msg[0].TuitionHigh))

            $('#Tuition01').text(zeroToEmpty(msg[0].Tuition01))
            $('#Tuition02').text(zeroToEmpty(msg[0].Tuition02))
            $('#Tuition03').text(zeroToEmpty(msg[0].Tuition03))
            $('#Tuition04').text(zeroToEmpty(msg[0].Tuition04))

            $('#Inter_Course_Founded_time').text(zeroToEmpty(msg[0].Inter_Course_Founded_time))
            $('#Club_Num').text(zeroToEmpty(msg[0].Club_Num))
            $('#Course_evaluation').text(zeroToEmpty(msg[0].Course_evaluation))
            $('#Stu_Year_Investment').text(zeroToEmpty(msg[0].Stu_Year_Investment))
            $('#Course').text(zeroToEmpty(msg[0].Course))
            $('#Student_Capacity').text(zeroToEmpty(msg[0].Student_Capacity))
            $('#Authentication').text(zeroToEmpty(msg[0].Authentication))
            $('#Graduated_Stu_Num').text(zeroToEmpty(msg[0].Graduated_Stu_Num))
            $('#Stu_Dominant_nationality').text(zeroToEmpty(msg[0].Stu_Dominant_nationality))
            $('#Student_Num_All').text(zeroToEmpty(msg[0].Student_Num_All))

            $('#Student_Num01').text(zeroToEmpty(msg[0].Student_Num01))
            $('#Student_Num02').text(zeroToEmpty(msg[0].Student_Num02))
            $('#Student_Num03').text(zeroToEmpty(msg[0].Student_Num03))
            $('#Student_Num04').text(zeroToEmpty(msg[0].Student_Num04))

            $('#President_Country').text(zeroToEmpty(msg[0].President_Country))
            $('#Staff_Num').text(zeroToEmpty(msg[0].Staff_Num))
            $('#Teacher_Salary').text(zeroToEmpty(msg[0].Teacher_Salary))
            $('#Teacher_Num').text(zeroToEmpty(msg[0].Teacher_Num))
            $('#Teacher_Year_Investment').text(zeroToEmpty(msg[0].Teacher_Year_Investment))
            $('#Foreign_Teacher_num').text(zeroToEmpty(msg[0].Foreign_Teacher_num))
            $('#Teacher_Stu_ratio').text(zeroToEmpty(msg[0].Teacher_Stu_ratio))
            $('#Teacher_Retention').text(zeroToEmpty(msg[0].Teacher_Retention))

            $('#Covered_Area').text(zeroToEmpty(msg[0].Covered_Area))
            $('#Built_Area').text(zeroToEmpty(msg[0].Built_Area))
            $('#Hardware').text(zeroToEmpty(msg[0].Hardware))
            $('#Investment').text(zeroToEmpty(msg[0].Investment))
            $('#Remark').text(zeroToEmpty(msg[0].Remark))

            $('#Load_People').text(msg[0].Load_People)
            $('#Load_Time').text(msg[0].Load_Time)

            // 学校名
            $('.schoolName').text(msg[0].School_name)
            //学校网址(先判断是否只有http或https)
            // website = msg[0].Website.substr(0,7).toLowerCase() == "http://" ? msg[0].Website : "http://" + msg[0].Website;

            if(msg[0].Website.substr(0,7).toLowerCase() == "http://"){
                website=msg[0].Website
            }else if (msg[0].Website.substr(0,7).toLowerCase() == "https:/"){
                website=msg[0].Website
            }else {
                website="http://" + msg[0].Website;
            }
            $('.Website').attr('href',website)

            //学校ID
            $('.everySchoolID').val(msg[0].Id)
            $('.headerSchoolID').text(msg[0].Id)

        },
        error:function(){
            alert('发生错误，请求数据失败！');
        }
    });

})







