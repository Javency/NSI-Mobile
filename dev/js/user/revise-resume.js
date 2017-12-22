//获取我的简历信息
function getResumeInfo() {
    $.ajax({
        type: "get",
        async: false,
        traditional: true,
        data: {
            Id:$.cookie('username')
        },//提交的参数
        url: 'http://' + changeUrl.address + '/talent_api?whereFrom=detail',
        dataType: "jsonp",//数据类型为jsonp  
        jsonp: "Callback",//服务端用于接收callback调用的function名的参数  
        success: function (msg) {
            console.log(msg)
            $('#Name').val(msg[0].Name)
            if( msg[0].Sex == 0){
                $("#optionsRadios2").attr('checked','checked')
            }else {
                $("#optionsRadios1").attr('checked','checked')
            }
            $('#Phone').val(msg[0].Phone)
            $('#Mail').val(msg[0].Mail)
            $('#Education').val(msg[0].Education)
            $('#Major').val(msg[0].Major)
            $('#NowWorkplace').val(msg[0].NowWorkplace)
            $('#WorkYear').val(msg[0].WorkYear)
            if( msg[0].Public == 0){
                $("#optionsRadios4").attr('checked','checked')
            }else {
                $("#optionsRadios3").attr('checked','checked')
            }

            $('#ExpectWorkPlace').val(msg[0].ExpectWorkPlace)
            $('#ExpectWorkPosition').val(msg[0].ExpectWorkPosition)
            $('#ExpectSalary').val(msg[0].ExpectSalary)
            $('#Other').val(msg[0].Other)

            $('#WorkExperience').val(msg[0].WorkExperience)
            $('#EducationBackground').val(msg[0].EducationBackground)
            $('#TrainingBackground').val(msg[0].TrainingBackground)
        },
        error: function () {
            alert('网络繁忙，请稍后再试！');
        }
    });
}

//过滤函数（如果为空，自动补零）
function autoAddZero( str ) {
    var strFilter = null;
    return strFilter = (str == '')? 0 : str;
}

//全局查询结果定义
var checkNameResult = null;
var checkPhoneResult = null;
var checkMailResult =null;
var checkEducationResult = null;
var checkNowWorkplaceResult = null;
var checkWorkYearResult = null;

//用户名不能为空的验证
function checkName(){
    if($('#Name').val() ==''){
        $('.hasError').eq(0).addClass('has-error')
        $('.hasError:eq(0) span').removeClass('hide')
        $('.NameCheck').text('姓名不能为空')
        $('.NameCheck').css('color','red')
        checkNameResult = false;
    }else{
        $('.NameCheck').text('')
        $('.hasError').eq(0).removeClass('has-error')
        $('.hasError:eq(0) span').addClass('hide')
        checkNameResult = true;
    }
}

//手机号码不能为空的验证
function checkPhone(){
    if($('#Phone').val() ==''){
        $('.hasError').eq(2).addClass('has-error')
        $('.hasError:eq(2) span').removeClass('hide')
        $('.PhoneCheck').text('电话号码不能为空')
        $('.PhoneCheck').css('color','red')
        checkPhoneResult = false;
    }else{
        $('.PhoneCheck').text('')
        $('.hasError').eq(2).removeClass('has-error')
        $('.hasError:eq(2) span').addClass('hide')
        checkPhoneResult = true;
    }
}

//邮箱不能为空的验证
function checkMail(){
    if($('#Mail').val() ==''){
        $('.hasError').eq(3).addClass('has-error')
        $('.hasError:eq(3) span').removeClass('hide')
        $('.MailCheck').text('邮箱不能为空')
        $('.MailCheck').css('color','red')
        checkMailResult = false;
    }else{
        $('.MailCheck').text('')
        $('.hasError').eq(3).removeClass('has-error')
        $('.hasError:eq(3) span').addClass('hide')
        checkMailResult = true;
    }
}

//最高学历不能为空的验证
function checkEducation(){
    if($('#Education').val() ==''){
        $('.hasError').eq(4).addClass('has-error')
        $('.hasError:eq(4) span').removeClass('hide')
        $('.EducationCheck').text('最高学历不能为空')
        $('.EducationCheck').css('color','red')
        checkEducationResult = false;
    }else{
        $('.EducationCheck').text('')
        $('.hasError').eq(4).removeClass('has-error')
        $('.hasError:eq(4) span').addClass('hide')
        checkEducationResult = true;
    }
}

//专业不能为空的验证
function checkMajor(){
    if($('#Major').val() ==''){
        $('.hasError').eq(5).addClass('has-error')
        $('.hasError:eq(5) span').removeClass('hide')
        $('.MajorCheck').text('专业不能为空')
        $('.MajorCheck').css('color','red')
        checkMajorResult = false;
    }else{
        $('.MajorCheck').text('')
        $('.hasError').eq(5).removeClass('has-error')
        $('.hasError:eq(5) span').addClass('hide')
        checkMajorResult = true;
    }
}

//工作单位不能为空的验证
function checkNowWorkplace(){
    if($('#NowWorkplace').val() ==''){
        $('.hasError').eq(6).addClass('has-error')
        $('.hasError:eq(6) span').removeClass('hide')
        $('.NowWorkplaceCheck').text('工作单位不能为空')
        $('.NowWorkplaceCheck').css('color','red')
        checkNowWorkplaceResult = false;
    }else{
        $('.NowWorkplaceCheck').text('')
        $('.hasError').eq(6).removeClass('has-error')
        $('.hasError:eq(6) span').addClass('hide')
        checkNowWorkplaceResult = true;
    }
}


//工作年限为整数的验证
function checkWorkYear(){
    var partt02= /^[1-9]\d*$/
    var foundTimeValue = $('#WorkYear').val()
    if(!partt02.test(foundTimeValue)){
        $('.hasError').eq(7).addClass('has-error')
        $('.hasError:eq(7) span').removeClass('hide')
        $('.WorkYearCheck').text('*必须为整数')
        $('.WorkYearCheck').css('color','red')
        checkWorkYearResult = false
    }else{
        $('.WorkYearCheck').text('')
        $('.WorkYearCheck').css('color','#999')
        $('.hasError').eq(7).removeClass('has-error')
        $('.hasError:eq(7) span').addClass('hide')
        checkWorkYearResult = true
    }
}

//表单提交（注意：只能绑定在标签内部）
function formSubmit() {
    checkName();
    checkPhone();
    checkMail();
    checkEducation();
    checkMajor();
    checkNowWorkplace();
    checkWorkYear();
    //全局查询结果定义
    var Sex = $('#Sex input:radio:checked').val()
    var Public = $('#Public input:radio:checked').val()
    var UserMail= $.cookie('username')
    if (  checkNameResult == true && checkPhoneResult == true && checkMailResult == true && checkEducationResult == true  && checkNowWorkplaceResult == true && checkWorkYearResult == true ) {
        var insertData = {
            'Name': autoAddZero($('#Name').val()),
            'Sex': Sex,
            'Phone': autoAddZero($('#Phone').val()),
            'Mail': autoAddZero($('#Mail').val()),
            'Education': autoAddZero($('#Education').val()),
            'Major': autoAddZero($('#Major').val()),
            'NowWorkplace': autoAddZero($('#NowWorkplace').val()),
            'WorkYear': autoAddZero($('#WorkYear').val()),
            'ExpectWorkPlace': autoAddZero($('#ExpectWorkPlace').val()),
            'ExpectWorkPosition': autoAddZero($('#ExpectWorkPosition').val()),
            'ExpectSalary': autoAddZero($('#ExpectSalary').val()),
            'Other': autoAddZero($('#Other').val()),
            'WorkExperience': autoAddZero($('#WorkExperience').val()),
            'EducationBackground': autoAddZero($('#EducationBackground').val()),
            'TrainingBackground': autoAddZero($('#TrainingBackground').val()),
            'Public': Public,

            'UserMail': UserMail

        }
        $.ajax({
            type: "get",
            async: false,
            traditional: true,
            data: insertData,//提交的参数
            url: 'http://' + changeUrl.address + '/talent_api?whereFrom=insert',
            dataType: "jsonp",//数据类型为jsonp  
            jsonp: "Callback",//服务端用于接收callback调用的function名的参数  
            beforeSend:function() { //触发ajax请求开始时执行
                $('#insertSubmit').text('提交数据中...');
                $('#insertSubmit').addClass('disabled')
                $('#insertSubmit').attr('onclick','javascript:void();');//改变提交按钮上的文字并将按钮设置为不可点击
            },
            success: function (msg) {
                console.log(msg)
                $('.shadowWrap').removeClass('hide')
                $('#autoJump').removeClass('hide')
                if(msg.msg ==1){
                    setInterval(function () {
                        alert('修改成功，可在用户中心查看')
                        window.location.href = './userinfo.html'
                    },1000)
                    $('#insertSubmit').text('立即提交');
                    $('#insertSubmit').removeClass('disabled')
                }else {
                    $('#insertSubmit').text('立即提交');
                    $('#insertSubmit').removeClass('disabled')
                    $('#insertSubmit').attr('onclick','formSubmit();');//改变提交按钮上的文字并将按钮设置为可点击
                }
            },
            error: function () {
                alert('网络繁忙，请稍后再试！');
                $('#insertSubmit').text('立即提交');
                $('#insertSubmit').removeClass('disabled')
                $('#insertSubmit').attr('onclick','formSubmit();');//改变提交按钮上的文字并将按钮设置为可点击
            }
        });
    } else {
        alert('数据格式有误，请重新输入')
    }
}


$(function () {
    getResumeInfo()
})