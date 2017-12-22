var checkInstutionNameResult = null;
var checkRepeatInstutionResult = null;
var checkFoundTimeResult = null;
var checkAddressResult =null;
var checkinstutionLableResult =null;
var checkServiceResult = null;

//机构名不能为空的验证
function checkInstutionName(){
    if($('#Name').val() ==''){
        $('.hasError01').eq(0).addClass('has-error')
        $('.hasError01:eq(0) span').removeClass('hide')
        $('.NameCheck').text('*机构名不能为空')
        $('.NameCheck').css('color','red')
        checkInstutionNameResult = false;
    }else{
        $('.NameCheck').text('')
        $('.hasError01').eq(0).removeClass('has-error')
        $('.hasError01:eq(0) span').addClass('hide')
        checkInstutionNameResult = true;
    }
}

//机构名重复验证
function checkRepeatInstution() {
    var instutionNameVal = $('#Name').val()
    $.ajax({
        url:"http://"+changeUrl.address+"/Institution_api?whereFrom=Check_InstitutionName",
        type: 'get',
        dataType:'jsonp',
        jsonp: "Callback",
        async : true,
        data: {
            Name:instutionNameVal
        },
        success: function(msg) {
            console.log(msg)
            if(msg.msg == 1){
                $('.popover-content:eq(0)').css('color','#999')
                $('.hasError01:eq(0)').popover('hide')
                checkRepeatInstutionResult = true;
                // $('#getSuccessMsg').val(checkRepeatInstutionResult)
            }else{
                $('.popover-content:eq(0)').css('color','red')
                $('.hasError01:eq(0)').popover('show')
                checkRepeatInstutionResult = false;
                // $('#getSuccessMsg').val(checkRepeatInstutionResult)
            }
        },
        error:function(){
            // alert('发生错误，请求数据失败！');
        }
    });
}

//成立时间验证 （匹配4位整数或者空）
function checkFoundTime() {
    var partt01= /^$|^\d{4}$/
    var foundTimeValue = $('#Founded_time').val()

    if(!partt01.test(foundTimeValue)){
        $('.hasError01').eq(1).addClass('has-error')
        $('.hasError01:eq(1) span').removeClass('hide')
        $('.foundTimeCheck').text('*必须为4位整数')
        $('.foundTimeCheck').css('color','red')
        checkFoundTimeResult = false
    }else{
        $('.foundTimeCheck').text('例如：2017，不添加月份')
        $('.foundTimeCheck').css('color','#999')
        $('.hasError01').eq(1).removeClass('has-error')
        $('.hasError01:eq(1) span').addClass('hide')
        checkFoundTimeResult = true
    }
}


//地址不能为空的验证
function checkAddress(){
    if($('#selProvince').val() =='' || $('#selCity').val() =='' || $('#Areas03').val() ==''){
        $('.addressCheck').text('*请完善地址信息')
        $('.addressCheck').css('color','red')
        $('.errColor').css('color','#a94442')
        checkAddressResult = false;
    }else{
        $('.addressCheck').text('注意：地址不能为空')
        $('.addressCheck').css('color','#999')
        $('.errColor').css('color','#333')
        checkAddressResult = true;
    }
}

//机构标签不能为空的验证
function checkinstutionLable(){
    if($('#instutionLable').val() ==''){
        $('.hasError01').eq(4).addClass('has-error')
        $('.hasError01:eq(4) span').removeClass('hide')
        $('.instutionLableCheck').text('*机构标签不能为空')
        $('.instutionLableCheck').css('color','red')
        checkinstutionLableResult = false;
    }else{
        $('.instutionLableCheck').text('')
        $('.hasError01').eq(4).removeClass('has-error')
        $('.hasError01:eq(4) span').addClass('hide')
        checkinstutionLableResult = true;
    }
}

//服务介绍不能为空的验证
function checkService(){
    if($('#Service').val() ==''){
        $('.ServiceCheck').text('*服务介绍不能为空')
        $('.ServiceCheck').css('color','red')
        $('.serviceErrColor').css('color','#a94442')
        checkServiceResult = false;
    }else{
        $('.ServiceCheck').text('')
        $('.serviceErrColor').css('color','#333')
        checkServiceResult = true;
    }
}

//第一个下一步
$('#nextStep01').click(function () {
    checkInstutionName()
    checkRepeatInstution()
    checkFoundTime()
    checkAddress()
    checkinstutionLable()
    checkService()

    if( checkInstutionNameResult == true && checkRepeatInstutionResult == true && checkFoundTimeResult == true && checkAddressResult==true && checkinstutionLableResult == true && checkServiceResult == true){
        $('#baseInfo').addClass('hide')
        $('#contactInfo').removeClass('hide')
        $('html,body').animate({scrollTop:0},300)
        $('#round01').removeClass('roundActive')
        $('#round02').addClass('roundActive')
        $(this).addClass('hide')
        $('#nextStep02').removeClass('hide')
    }else {
        alert("数据格式错误，请重新输入")
        $('html,body').animate({scrollTop:0},300)
    }

})

//第二个下一步
$('#nextStep02').click(function () {

        $('#contactInfo').addClass('hide')
        $('#otherInfo').removeClass('hide')
        $('html,body').animate({scrollTop:0},300)
        $('#round02').removeClass('roundActive')
        $('#round03').addClass('roundActive')
        $(this).addClass('hide')
        $('#readySubmit').removeClass('hide')

})

//过滤函数（如果为空，自动补零）
function autoAddZero( str ) {
    var strFilter = null;
    return strFilter = (str == '')? 0 : str;
}


//表单提交（注意：只能绑定在标签内部）
function formSubmit() {
        var insertData = {
            'Name': autoAddZero($('#Name').val()),
            'Founded_time': autoAddZero($('#Founded_time').val()),
            'Areas': autoAddZero($('#selProvince').val()),
            'Areas02': autoAddZero($('#selCity').val()),
            'Areas03': autoAddZero($('#Areas03').val()),
            'Type': autoAddZero($('#institutionType').val()),
            'Label': autoAddZero($('#instutionLable').val()),
            'Website': autoAddZero($('#Website').val()),
            'Service': autoAddZero($('#Service').val()),
            'ContactPosition': autoAddZero($('#ContactPosition').val()),
            'ContactName': autoAddZero($('#ContactName').val()),
            'ContactPhone': autoAddZero($('#ContactPhone').val()),
            'ContactMail': autoAddZero($('#ContactMail').val()),
            'Introduction': autoAddZero($('#Introduction').val()),
            'Investment': autoAddZero($('#Investment').val()),
            'Remark': autoAddZero($('#Remark').val()),
            'ServedSchool': autoAddZero($('#ServedSchool').val()),

            "load_people":$.cookie('username'),
            "member_sign":$.cookie('usertitle')
        }
        $.ajax({
            type: "get",
            async: false,
            traditional: true,
            data: insertData,//提交的参数
            url: 'http://' + changeUrl.address + '/Institution_api?whereFrom=insert',
            dataType: "jsonp",//数据类型为jsonp  
            jsonp: "Callback",//服务端用于接收callback调用的function名的参数 
            beforeSend:function() { //触发ajax请求开始时执行
                $('#insertSubmit').text('提交数据中...');
                $('#insertSubmit').addClass('disabled')
                $('#insertSubmit').attr('onclick','javascript:void();');//改变提交按钮上的文字并将按钮设置为不可点击
            },//  
            success: function (msg) {
                if(msg.msg ==1){
                    alert('数据提交成功，请等待管理员审核。')
                    window.location.href = './institution.html'
                }else{
                    $('#insertSubmit').text('立即提交');
                    $('#insertSubmit').removeClass('disabled')
                    $('#insertSubmit').attr('onclick','instutionFormSubmit();');//改变提交按钮上的文字并将按钮设置为可点击
                }

            },
            error: function () {
                alert('网络繁忙，请稍后再试！');
                $('#insertSubmit').text('立即提交');
                $('#insertSubmit').removeClass('disabled')
                $('#insertSubmit').attr('onclick','instutionFormSubmit();');//改变提交按钮上的文字并将按钮设置为可点击
            }
        });

}




