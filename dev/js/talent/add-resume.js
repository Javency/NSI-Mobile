//过滤函数（如果为空，自动补零）
function autoAddZero( str ) {
    var strFilter = null;
    return strFilter = (str == '')? 0 : str;
}

//全局查询结果定义
var checkNameResult = null;
var checkPhoneResult = null;
var checkMailResult =null;
var checkMajorResult = null;
var checkNowWorkplaceResult = null;
var checkWorkYearResult = null;

//用户名不能为空的验证
function checkName(){
    if($('#Name').val() ==''){
        $('.hasError').eq(0).addClass('has-error')
        $('.hasError:eq(0) span').removeClass('hide')
        $('.NameCheck').text('*姓名不能为空')
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
        $('.PhoneCheck').text('*电话号码不能为空')
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
        $('.MailCheck').text('*邮箱不能为空')
        $('.MailCheck').css('color','red')
        checkMailResult = false;
    }else{
        $('.MailCheck').text('')
        $('.hasError').eq(3).removeClass('has-error')
        $('.hasError:eq(3) span').addClass('hide')
        checkMailResult = true;
    }
}


//专业不能为空的验证
function checkMajor(){
    if($('#Major').val() ==''){
        $('.hasError').eq(5).addClass('has-error')
        $('.hasError:eq(5) span').removeClass('hide')
        $('.MajorCheck').text('*专业不能为空')
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
        $('.NowWorkplaceCheck').text('*工作单位不能为空')
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

//第一个下一步，到求职信息页面
$('#toNextStep02').click(function () {
    checkName();
    checkPhone();
    checkMail();
    checkMajor();
    checkNowWorkplace();
    checkWorkYear();
    if (  checkNameResult == true && checkPhoneResult == true && checkMailResult == true && checkMajorResult == true && checkNowWorkplaceResult == true && checkWorkYearResult == true ) {
        $('#step01').addClass('hide')
        $('#step02').removeClass('hide')
        $('#num01').removeClass('active')
        $('#num02').addClass('active')
    }
})

//第一个上一部。跳到基本信息页面
$('#toPrevStep01').click(function () {
    $('#step02').addClass('hide')
    $('#step01').removeClass('hide')
    $('#num02').removeClass('active')
    $('#num01').addClass('active')
})

//第二个下一步，跳到其他信息页面
$('#toNextStep03').click(function () {
    $('#step02').addClass('hide')
    $('#step03').removeClass('hide')
    $('#num02').removeClass('active')
    $('#num03').addClass('active')
})

//第二个上一步，跳到求职信息
$('#toPrevStep02').click(function () {
    $('#step03').addClass('hide')
    $('#step02').removeClass('hide')
    $('#num03').removeClass('active')
    $('#num02').addClass('active')
})

//表单提交（注意：只能绑定在标签内部）
function formSubmit() {
    checkName();
    checkPhone();
    checkMail();
    checkMajor();
    checkNowWorkplace();
    checkWorkYear();
    //全局查询结果定义
    var Sex = $('#Sex input:radio:checked').val()
    var Public = $('#Public input:radio:checked').val()
    var UserMail= $.cookie('username')
    if (  checkNameResult == true && checkPhoneResult == true && checkMailResult == true  && checkMajorResult == true && checkNowWorkplaceResult == true && checkWorkYearResult == true ) {
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
                if(msg.msg ==1){
                    alert('简历提交成功！可在用户中心查看。')
                    window.location.href='../user/userinfo.html'
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

