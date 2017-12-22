//过滤函数（如果为空，自动补零）
function autoAddZero( str ) {
    var strFilter = null;
    return strFilter = (str == '')? 0 : str;
}

//全局查询结果定义
var checkSubjectNameResult = null;
var checkCompanyResult = null;
var checkNameResult =null;
var checkPhoneResult = null;
var checkMailResult = null;
var checkSubjectIntroductionResult = null;

//项目不能为空的验证
function checkSubjectName(){
    if($('#SubjectName').val() ==''){
        $('.hasError').eq(0).addClass('has-error')
        $('.hasError:eq(0) span').removeClass('hide')
        $('.SubjectNameCheck').text('*项目不能为空')
        $('.SubjectNameCheck').css('color','red')
        checkSubjectNameResult = false;
    }else{
        $('.SubjectNameCheck').text('')
        $('.hasError').eq(0).removeClass('has-error')
        $('.hasError:eq(0) span').addClass('hide')
        checkSubjectNameResult = true;
    }
}

//发布单位不能为空的验证
function checkCompany(){
    if($('#Company').val() ==''){
        $('.hasError').eq(2).addClass('has-error')
        $('.hasError:eq(2) span').removeClass('hide')
        $('.CompanyCheck').text('*发布单位不能为空')
        $('.CompanyCheck').css('color','red')
        checkCompanyResult = false;
    }else{
        $('.CompanyCheck').text('')
        $('.hasError').eq(2).removeClass('has-error')
        $('.hasError:eq(2) span').addClass('hide')
        checkCompanyResult = true;
    }
}

//联系人不能为空的验证
function checkName(){
    if($('#Name').val() ==''){
        $('.hasError').eq(4).addClass('has-error')
        $('.hasError:eq(4) span').removeClass('hide')
        $('.NameCheck').text('*联系人不能为空')
        $('.NameCheck').css('color','red')
        checkNameResult = false;
    }else{
        $('.NameCheck').text('')
        $('.hasError').eq(4).removeClass('has-error')
        $('.hasError:eq(4) span').addClass('hide')
        checkNameResult = true;
    }
}

//电话不能为空的验证
function checkPhone(){
    if($('#Phone').val() ==''){
        $('.hasError').eq(5).addClass('has-error')
        $('.hasError:eq(5) span').removeClass('hide')
        $('.PhoneCheck').text('*电话不能为空')
        $('.PhoneCheck').css('color','red')
        checkPhoneResult = false;
    }else{
        $('.PhoneCheck').text('')
        $('.hasError').eq(5).removeClass('has-error')
        $('.hasError:eq(5) span').addClass('hide')
        checkPhoneResult = true;
    }
}

//邮箱不能为空的验证
function checkMail(){
    if($('#Mail').val() ==''){
        $('.hasError').eq(6).addClass('has-error')
        $('.hasError:eq(6) span').removeClass('hide')
        $('.MailCheck').text('邮箱不能为空')
        $('.MailCheck').css('color','red')
        checkMailResult = false;
    }else{
        $('.MailCheck').text('')
        $('.hasError').eq(6).removeClass('has-error')
        $('.hasError:eq(6) span').addClass('hide')
        checkMailResult = true;
    }
}

//项目简介不能为空的验证
function checkSubjectIntroduction(){
    if($('#SubjectIntroduction').val() ==''){
        $('.hasError').eq(7).addClass('has-error')
        $('.hasError:eq(7) span').removeClass('hide')
        $('.SubjectIntroductionCheck').text('*项目简介不能为空')
        $('.SubjectIntroductionCheck').css('color','red')
        checkSubjectIntroductionResult = false;
    }else{
        $('.SubjectIntroductionCheck').text('')
        $('.hasError').eq(7).removeClass('has-error')
        $('.hasError:eq(7) span').addClass('hide')
        checkSubjectIntroductionResult = true;
    }
}

//表单提交（注意：只能绑定在标签内部）
function projectFormSubmit() {
    checkSubjectName();
    checkCompany();
    checkName();
    checkPhone();
    checkMail();
    checkSubjectIntroduction();
    //全局查询结果定义
    var UserMail= $.cookie('username')

    if (  checkSubjectNameResult == true && checkCompanyResult == true && checkNameResult == true && checkPhoneResult == true && checkMailResult == true && checkSubjectIntroductionResult == true  ) {
        var insertData = {
            'SubjectName': autoAddZero($('#SubjectName').val()),
            'Areas': autoAddZero($('#selProvince').val()),
            'Areas02': autoAddZero($('#selCity').val()),
            'Areas03': autoAddZero($('#Areas03').val()),
            'Company': autoAddZero($('#Company').val()),
            'SubjectLabel': autoAddZero($('#SubjectLabel').val()),
            'Name': autoAddZero($('#Name').val()),
            'Phone': autoAddZero($('#Phone').val()),
            'Mail': autoAddZero($('#Mail').val()),
            'SubjectIntroduction': autoAddZero($('#SubjectIntroduction').val()),
            'DetailInstitution': autoAddZero($('#DetailInstitution').val()),
            'Requirement': autoAddZero($('#Requirement').val()),

            'UserMail': UserMail


        }
        $.ajax({
            type: "get",
            async: false,
            traditional: true,
            data: insertData,//提交的参数
            url: 'http://' + changeUrl.address + '/Subject_api?whereFrom=insert',
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
                    alert('您的信息已提交至新学说项目库，建议上传详细项目附件。检索功能随后上线')
                    $('#insertSubmit').text('立即提交');
                    $('#insertSubmit').removeClass('disabled')
                }else {
                    $('#insertSubmit').text('立即提交');
                    $('#insertSubmit').removeClass('disabled')
                    $('#insertSubmit').attr('onclick','projectFormSubmit();');//改变提交按钮上的文字并将按钮设置为可点击
                }
            },
            error: function () {
                alert('网络繁忙，请稍后再试！');
                $('#insertSubmit').text('立即提交');
                $('#insertSubmit').removeClass('disabled')
                $('#insertSubmit').attr('onclick','projectFormSubmit();');//改变提交按钮上的文字并将按钮设置为可点击
            }
        });
    } else {
       alert('数据格式有误，请重新输入')
    }
}
