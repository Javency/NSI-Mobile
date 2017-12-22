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
            $('#ResumeName').text(msg[0].Name)
            $('#Sex').text((msg[0].Sex == 0) ? '女' : '男')
            $('#Phone').text(msg[0].Phone)
            $('#Mail').text(msg[0].Mail)
            $('#Education').text(msg[0].Education)
            $('#Major').text(msg[0].Major)
            $('#NowWorkplace').text(msg[0].NowWorkplace)
            $('#WorkYear').text(msg[0].WorkYear)
            $('#Public').text((msg[0].Public == 0) ? '否' : '是')

            $('#ExpectWorkPlace').text(msg[0].ExpectWorkPlace)
            $('#ExpectWorkPosition').text(msg[0].ExpectWorkPosition)
            $('#ExpectSalary').text(msg[0].ExpectSalary)
            $('#Other').text(msg[0].Other)

            $('#WorkExperience').text(msg[0].WorkExperience)
            $('#EducationBackground').text(msg[0].EducationBackground)
            $('#TrainingBackground').text(msg[0].TrainingBackground)
        },
        error: function () {
            alert('网络繁忙，请稍后再试！');
        }
    });
}

$(function () {
    getResumeInfo()
})