
//全局查询结果定义
var checkSchoolNameResult = null;
var checkRepeatSchoolResult =null;
var checkAddressResult = null;
var checkFoundTimeResult = null;
var checkSchoolSystemResult = null;

//学校名不能为空的验证
function checkSchoolName(){
    if($('#School_name').val() ==''){
        $('.hasError01').eq(0).addClass('has-error')
        $('.hasError01:eq(0) span').removeClass('hide')
        $('.SchoolNameCheck').text('*学校名不能为空')
        $('.SchoolNameCheck').css('color','red')
        checkSchoolNameResult = false;
    }else{
        $('.SchoolNameCheck').text('*学校名不能为空')
        $('.hasError01').eq(0).removeClass('has-error')
        $('.hasError01:eq(0) span').addClass('hide')
        $('.SchoolNameCheck').css('color','#999')
        checkSchoolNameResult = true;
    }
}

//学校名重复验证
function checkRepeatSchool() {
    var schoolNameVal = $('#School_name').val()
    $.ajax({
        url:"http://"+changeUrl.address+"/School_api?whereFrom=Check_SchoolName",
        type: 'post',
        dataType:'jsonp',
        jsonp: "Callback",
        async : true,
        data: {SchoolName:schoolNameVal},
        success: function(msg) {
            console.log(msg)
            if(msg.msg == 1){
                $('.popover-content:eq(0)').css('color','#999')
                $('.hasError01:eq(0)').popover('hide')
                checkRepeatSchoolResult = true;
                // $('#getSuccessMsg').val(checkRepeatSchoolResult)
            }else{
                $('.popover-content:eq(0)').css('color','red')
                $('.hasError01:eq(0)').popover('show')
                checkRepeatSchoolResult = false;
                // $('#getSuccessMsg').val(checkRepeatSchoolResult)
            }
        },
        error:function(){
            alert('发生错误，请求数据失败！');
        }
    });
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

//成立时间验证 （匹配4位整数或者空）
function checkFoundTime() {
    var partt01= /^$|^\d{4}$/
    var foundTimeValue = $('#Founded_time').val()

    if(!partt01.test(foundTimeValue)){
        $('.hasError01').eq(4).addClass('has-error')
        $('.hasError:eq(4) span').removeClass('hide')
        $('.foundTimeCheck').text('*必须为4位整数')
        $('.foundTimeCheck').css('color','red')
        checkFoundTimeResult = false
    }else{
        $('.foundTimeCheck').text('例如：2017，不添加月份')
        $('.foundTimeCheck').css('color','#999')
        $('.hasError01').eq(4).removeClass('has-error')
        $('.hasError:eq(4) span').addClass('hide')
        checkFoundTimeResult = true
    }
}

//学制不能为空的验证
function checkSchoolSystem(){
    if($('#School_system').val() ==''){
        $('.hasError01').eq(6).addClass('has-error')
        $('.hasError:eq(6) span').removeClass('hide')
        $('.schoolSystemCheck').text('*学制不能为空')
        $('.schoolSystemCheck').css('color','red')
        checkSchoolSystemResult = false;
    }else{
        $('.schoolSystemCheck').text('')
        $('.hasError01').eq(6).removeClass('has-error')
        $('.hasError01:eq(6) span').addClass('hide')
        checkSchoolSystemResult = true;
    }
}

$('#nextStep01').click(function () {
    checkSchoolName();
    checkRepeatSchool();
    checkAddress();
    checkFoundTime();
    checkSchoolSystem();

    if( checkSchoolNameResult == true && checkRepeatSchoolResult == true && checkAddressResult == true && checkFoundTimeResult==true && checkSchoolSystemResult == true){
        $('#baseInfo').addClass('hide')
        $('#courseInfo').removeClass('hide')
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


var checkIntCourseResult = null;
var checkCourseResult = null;
//国际课程最早认证时间验证 （匹配4位整数或者空）
function checkIntCourse() {
    var partt01= /^$|^\d{4}$/
    var intnCourseValue = $('#Inter_Course_Founded_time').val()

    if(!partt01.test(intnCourseValue)){
        $('.hasError02').eq(0).addClass('has-error')
        $('.hasError02:eq(0) span').removeClass('hide')
        $('.intnCourseCheck').text('必须为4位整数')
        $('.intnCourseCheck').css('color','red')
        checkIntCourseResult = false
    }else{
        $('.intnCourseCheck').text('例如：2017，不添加月份')
        $('.intnCourseCheck').css('color','#999')
        $('.hasError02').eq(0).removeClass('has-error')
        $('.hasError02:eq(0) span').addClass('hide')
        checkIntCourseResult = true
    }
}

//国际课程不能为空的验证
function checkCourse(){
    if($('#Course').val() ==''){
        $('.hasError02').eq(1).addClass('has-error')
        $('.hasError02:eq(1) span').removeClass('hide')
        $('.courseCheck').text('*国际课程不能为空')
        $('.courseCheck').css('color','red')
        checkCourseResult = false;
    }else{
        $('.courseCheck').text('')
        $('.hasError02').eq(1).removeClass('has-error')
        $('.hasError02:eq(1) span').addClass('hide')
        checkCourseResult = true;
    }
}

$('#nextStep02').click(function () {
    checkIntCourse()
    checkCourse()


    if( checkIntCourseResult == true && checkCourseResult == true ){

        $('#courseInfo').addClass('hide')
        $('#stuInfo').removeClass('hide')
        $('html,body').animate({scrollTop:0},300)
        $('#round02').removeClass('roundActive')
        $('#round03').addClass('roundActive')
        $(this).addClass('hide')
        $('#nextStep03').removeClass('hide')

    }else {
        alert("数据格式错误，请重新输入")
        $('html,body').animate({scrollTop:0},300)
    }

})

var checkStudentNumResult = null;
var checkStuCapacityResult = null;
var checkGraduateStuResult = null;
var checkFloatResult = null;

//在校生人数能为空或为整数验证
function checkStudentNum () {
    var partt02= /^$|^[1-9]\d*$/
    var studentNumValue = $('#Student_Num_All').val()
    if(!partt02.test(studentNumValue)){
        $('.hasError03').eq(1).addClass('has-error')
        $('.hasError03:eq(1) span').removeClass('hide')
        $('.studentNumCheck').text('*需要为整数')
        $('.studentNumCheck').css('color','red')
        checkStudentNumResult = false
    }else{
        $('.studentNumCheck').text('注意：需要为整数，例如：1000')
        $('.studentNumCheck').css('color','#999')
        $('.hasError03').eq(1).removeClass('has-error')
        $('.hasError03:eq(1) span').addClass('hide')
        checkStudentNumResult = true
    }
}

//总容量可以为空且为整数验证
function checkStuCapacity () {
    var partt02= /^$|^[1-9]\d*$/
    var StuCapacityValue = $('#Student_Capacity').val()
    if(!partt02.test(StuCapacityValue)){
        $('.hasError03').eq(2).addClass('has-error')
        $('.hasError03:eq(2) span').removeClass('hide')
        $('.stuCapacityCheck').text('*需要为整数')
        $('.stuCapacityCheck').css('color','red')
        checkStuCapacityResult = false
    }else{
        $('.stuCapacityCheck').text('注意：需要为整数，例如：1000')
        $('.stuCapacityCheck').css('color','#999')
        $('.hasError03').eq(15).removeClass('has-error')
        $('.hasError03:eq(15) span').addClass('hide')
        checkStuCapacityResult = true
    }
}

//毕业班人数不能为空且为整数验证
function checkGraduatedStuNum () {
    var partt02= /^$|^[1-9]\d*$/
    var graduatedStuNumValue = $('#Graduated_Stu_Num').val()
    if(!partt02.test(graduatedStuNumValue)){
        $('.hasError03').eq(3).addClass('has-error')
        $('.hasError03:eq(3) span').removeClass('hide')
        $('.graduateStuCheck').text('*需要为整数')
        $('.graduateStuCheck').css('color','red')
        checkGraduateStuResult = false
    }else{
        $('.graduateStuCheck').text('注意：需要为整数，例如：1000')
        $('.graduateStuCheck').css('color','#999')
        $('.hasError03').eq(3).removeClass('has-error')
        $('.hasError03:eq(3) span').addClass('hide')
        checkGraduateStuResult = true
    }
}

//匹配浮点数
function checkFloat(idName,className,num) {
    var partt03= /^$|^(-?\d+)(\.\d+)?$/
    var foundTimeValue = $(idName).val()
    if(!partt03.test(foundTimeValue)){
        $('.hasError03').eq(num).addClass('has-error')
        $('.hasError03:eq('+ num +') span').removeClass('hide')
        $(className).text('*必须为数字')
        $(className).css('color','red')
        checkFloatResult = false
    }else{
        $(className).text('注意：需要为数字')
        $(className).css('color','#999')
        $('.hasError').eq(num).removeClass('has-error')
        $('.hasError:eq('+ num +') span').addClass('hide')
        checkFloatResult = true
    }
}

$('#nextStep03').click(function () {
    checkStudentNum()
    checkStuCapacity()
    checkGraduatedStuNum()
    checkFloat('#Club_Num','.clubNumCheck',6)

    if( checkIntCourseResult == true && checkCourseResult == true && checkGraduateStuResult == true && checkFloatResult == true ){

        checkFloat('#Club_Num','.clubNumCheck',6)

        $('#stuInfo').addClass('hide')
        $('#teacherInfo').removeClass('hide')
        $('html,body').animate({scrollTop:0},300)
        $('#round03').removeClass('roundActive')
        $('#round04').addClass('roundActive')
        $(this).addClass('hide')
        $('#nextStep04').removeClass('hide')
    }else {
        alert("数据格式错误，请重新输入")
        $('html,body').animate({scrollTop:0},300)
    }

})


var checkStaffNumResult = null;
var checkTeacherNumResult = null;
var checkForeignTeacherResult = null;

//总员工数量（可以为空）
function checkStaffNum() {
    var partt02= /^$|^[1-9]\d*$/
    var staffNumValue = $('#Staff_Num').val()
    if(!partt02.test(staffNumValue)){
        $('.hasError04').eq(1).addClass('has-error')
        $('.hasError04:eq(1) span').removeClass('hide')
        $('.staffNumCheck').text('*必须为整数')
        $('.staffNumCheck').css('color','red')
        checkStaffNumResult = false
    }else{
        $('.staffNumCheck').text('注意：需要为整数，例如：1000')
        $('.staffNumCheck').css('color','#999')
        $('.hasError04').eq(1).removeClass('has-error')
        $('.hasError04:eq(1) span').addClass('hide')
        checkStaffNumResult = true
    }
}

//总教师数量（可以为空）
function checkTeacherNum() {
    var partt02= /^$|^[1-9]\d*$/
    var teacherNumValue = $('#Teacher_Num').val()
    if(!partt02.test(teacherNumValue)){
        $('.hasError04').eq(2).addClass('has-error')
        $('.hasError04:eq(2) span').removeClass('hide')
        $('.teacherNumCheck').text('*必须为整数')
        $('.teacherNumCheck').css('color','red')
        checkTeacherNumResult = false
    }else{
        $('.teacherNumCheck').text('注意：需要为整数，例如：1000')
        $('.teacherNumCheck').css('color','#999')
        $('.hasError04').eq(2).removeClass('has-error')
        $('.hasError04:eq(2) span').addClass('hide')
        checkTeacherNumResult = true
    }
}

//外籍教师数量（可以为空）
function checkForeignTeacherNum() {
    var partt02= /^$|^[1-9]\d*$/
    var foreignTeacherNumValue = $('#Foreign_Teacher_num').val()
    if(!partt02.test(foreignTeacherNumValue)){
        $('.hasError04').eq(3).addClass('has-error')
        $('.hasError04:eq(3) span').removeClass('hide')
        $('.foreignTeacherCheck').text('*必须为整数')
        $('.foreignTeacherCheck').css('color','red')
        checkForeignTeacherResult = false
    }else{
        $('.foreignTeacherCheck').text('注意：需要为整数，例如：1000')
        $('.foreignTeacherCheck').css('color','#999')
        $('.hasError04').eq(3).removeClass('has-error')
        $('.hasError04:eq(3) span').addClass('hide')
        checkForeignTeacherResult = true
    }
}

$('#nextStep04').click(function () {
    checkStaffNum()
    checkTeacherNum()
    checkForeignTeacherNum()


    if( checkStaffNumResult == true && checkTeacherNumResult == true && checkForeignTeacherResult == true  ){

        $('#teacherInfo').addClass('hide')
        $('#otherInfo').removeClass('hide')
        $('html,body').animate({scrollTop:0},300)
        $('#round04').removeClass('roundActive')
        $('#round05').addClass('roundActive')
        $(this).addClass('hide')
        $('#readySubmit').removeClass('hide')
    }else {
        alert("数据格式错误，请重新输入")
        $('html,body').animate({scrollTop:0},300)
    }
})

var checkMuMeterResult = null;
var checkBuiltAreaResult =null;
//亩米匹配
function checkMuMeter() {
    var partt04= /^$|^(-?\d+)(\.\d+)?$/
    var coveredAreaValue = $('#Covered_Area').val()
    if(!partt04.test(coveredAreaValue)){
        $('.hasError05').eq(0).addClass('has-error')
        $('.hasError05:eq(0) span').removeClass('hide')
        $('.popover-content').css('color','red')
        $('.hasError05:eq(0)').popover('show')
        checkMuMeterResult = false
    }else{
        $('.hasError05').eq(0).removeClass('has-error')
        $('.hasError05:eq(0) span').addClass('hide')
        $('.hasError05:eq(0)').popover('hide')
        $('.popover-content').css('color','#999')
        checkMuMeterResult = true
    }
}

//建筑面积（可以为空）
function checkBuiltArea() {
    var partt02= /^$|^(-?\d+)(\.\d+)?$/
    var builtAreaValue = $('#Built_Area').val()
    if(!partt02.test(builtAreaValue)){
        $('.hasError05').eq(1).addClass('has-error')
        $('.hasError05:eq(1) span').removeClass('hide')
        $('.builtAreaCheck').text('*必须为数字')
        $('.builtAreaCheck').css('color','red')
        checkBuiltAreaResult = false
    }else{
        $('.teacherNumCheck').text('注意：需要为整数，例如：1000')
        $('.teacherNumCheck').css('color','#999')
        $('.hasError05').eq(1).removeClass('has-error')
        $('.hasError05:eq(1) span').addClass('hide')
        checkBuiltAreaResult = true
    }
}


//提示框触发
$('#Covered_Area').focus(function () {
    $('.popover-content').css('color','#999')
    $('.hasError05:eq(0)').popover('show')
})
//过滤函数（如果为空，自动补零）
function autoAddZero( str ) {
    var strFilter = null;
    return strFilter = (str == '')? 0 : str;
}


//表单提交（注意：只能绑定在标签内部）
function formSubmit() {
    checkMuMeter()
    checkBuiltArea()

    if (checkMuMeterResult == true &&  checkBuiltAreaResult == true
    ) {
        var insertData = {
            'School_name': autoAddZero($('#School_name').val()),
            'School_EnglishName': autoAddZero($('#School_EnglishName').val()),
            'School_properties': autoAddZero($('#School_properties').val()),
            'Areas': autoAddZero($('#selProvince').val()),
            'Areas02': autoAddZero($('#selCity').val()),
            'Areas03': autoAddZero($('#Areas03').val()),
            'Founded_time': autoAddZero($('#Founded_time').val()),
            'OperationState': autoAddZero($('#OperationState').val()),
            'School_system': autoAddZero($('#School_system').val()),

            'Tuition01': autoAddZero($('#Tuition01').val()),
            'Tuition02': autoAddZero($('#Tuition02').val()),
            'Tuition03': autoAddZero($('#Tuition03').val()),
            'Tuition04': autoAddZero($('#Tuition04').val()),

            'TuitionHigh': autoAddZero($('#TuitionHigh').val()),
            'Website': autoAddZero($('#Website').val()),
            'Telephone': autoAddZero($('#Telephone').val()),
            'Inter_Course_Founded_time': autoAddZero($('#Inter_Course_Founded_time').val()),
            'Course': autoAddZero($('#Course').val()),
            'Authentication': autoAddZero($('#Authentication').val()),
            'Course_evaluation': autoAddZero($('#Course_evaluation').val()),

            'Student_Num01': autoAddZero($('#Student_Num01').val()),
            'Student_Num02': autoAddZero($('#Student_Num02').val()),
            'Student_Num03': autoAddZero($('#Student_Num03').val()),
            'Student_Num04': autoAddZero($('#Student_Num04').val()),

            'Student_Num_All': autoAddZero($('#Student_Num_All').val()),
            'Student_Capacity': autoAddZero($('#Student_Capacity').val()),
            'Graduated_Stu_Num': autoAddZero($('#Graduated_Stu_Num').val()),
            'Stu_Dominant_nationality': autoAddZero($('#Stu_Dominant_nationality').val()),
            'Stu_Year_Investment': autoAddZero($('#Stu_Year_Investment').val()),
            'Club_Num': autoAddZero($('#Club_Num').val()),
            'President_Country': autoAddZero($('#President_Country').val()),
            'Staff_Num': autoAddZero($('#Staff_Num').val()),
            'Teacher_Num': autoAddZero($('#Teacher_Num').val()),
            'Foreign_Teacher_num': autoAddZero($('#Foreign_Teacher_num').val()),
            'Teacher_Year_Investment': autoAddZero($('#Teacher_Year_Investment').val()),
            'Teacher_Retention': autoAddZero($('#Teacher_Retention').val()),
            'Teacher_Salary': autoAddZero($('#Teacher_Salary').val()),
            'Teacher_Stu_ratio': autoAddZero($('#Teacher_Stu_ratio').val()),
            'Covered_Area': autoAddZero($('#Covered_Area').val()),
            'Built_Area': autoAddZero($('#Built_Area').val()),
            'Hardware': autoAddZero($('#Hardware').val()),
            'Investment': autoAddZero($('#Investment').val()),
            'Remark': autoAddZero($('#Remark').val()),

            "Load_People":$.cookie('username'),
            "member_sign":$.cookie('usertitle')
            // "Load_People":"binbin",
            // "member_sign":8
        }
        $.ajax({
            type: "get",
            async: false,
            traditional: true,
            data: insertData,//提交的参数
            url: 'http://' + changeUrl.address + '/School_api?whereFrom=insert',
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
                    alert('恭喜！数据提交成功')
                    $('#insertSubmit').text('立即提交');
                    $('#insertSubmit').removeClass('disabled')
                    // window.location.href = './search.html'
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
        alert('数据格式错误，请重新输入')
        $('html,body').animate({scrollTop:0},300)
    }
}




