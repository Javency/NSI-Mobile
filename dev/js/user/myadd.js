//Tab切换
$('#siteTab li').click(function () {
    var _index = $(this).index()
    $('#siteTab span').removeClass('active')
    $(this).children('span').addClass('active')
    $('.tabIndex').addClass('hide')
    $('.tabIndex').eq(_index).removeClass('hide')
})


//创建列表（学校）
function createList01(msg) {
    for(var i=0;i<msg.length;i++){
        var imgSrc = msg[i].School_logo ? 'http://'+changeUrl.imgAddress+msg[i].School_logo : '../images/public/nsi_nopic.png';
        $('#schoolWrap').append(
        '<div class="addSchool_list clearfix">'+
            '<div class="fl"><a href="./detail.html?School_name='+msg[i].Id+'&whereFrom=search"><img src="'+imgSrc+'" alt="学校" class="school-img"></a></div>'+
            '<div class="fl school-info">'+
                '<a href="./detail.html?School_name='+msg[i].Id+'&whereFrom=search"><h4 class="school-name">'+msg[i].School_name+'</h4></a>'+
                '<p class="school-type">学制：<span>'+msg[i].School_system+'</span></p>'+
                '<p class="school-course">课程：<span>'+msg[i].Course+'</span></p>'+
                '<p class="school-course">类型：<span>'+msg[i].School_properties+'</span></p>'+
            '</div>'+
        '</div>'
        )
    }
}

//创建列表（机构）
function createList02(msg) {
    for(var i=0;i<msg.length;i++){
        var imgSrc = msg[i].Institution_logo ? (msg[i].Institution_logo !=0 ? 'http://'+changeUrl.imgAddress+msg[i].Institution_logo : '../images/public/nsi_nopic.png') : '../images/public/nsi_nopic.png';
        $('#institutionWrap').append(
        '<div class="addInstitution_list clearfix">'+
            '<div class="fl"><a href="./detail.html?School_name='+msg[i].Id+'&whereFrom=search"><img src="'+imgSrc+'" alt="机构" class="institution-img"></a></div>'+
            '<div class="fl institution-info">'+
            '<a href="./detail.html?School_name='+msg[i].Id+'&whereFrom=search"><h4 class="institution-name">'+msg[i].Name+'</h4></a>'+
            '<p class="institution-lable">标签：<span>'+msg[i].Label+'</span></p>'+
            '<p class="institution-type">类型：<span>'+msg[i].Type+'</span></p>'+
            '<p class="institution-time">成立时间：<span>'+msg[i].Founded_time+'</span></p>'+
           '</div>'+
        '</div>'
        )
    }
}

//创建列表（项目）
function createList03(msg) {
    for(var i=0;i<msg.length;i++){
        $('#institutionWrap').append(
            '<div class="projectSearch_list">'+
                 '<div class="project-show">'+
                     '<img src="../images/project/triangle.png" alt="三角图标" class="triangle">'+
                     '<a href="./detail.html"><img src="../images/project/nsi_project.jpg" alt="热门项目" class="project-img"></a>'+
                 '</div>'+
                 '<p class="project-name">新学说-国际学校项目数据库</p>'+
                 '<a href="./detail.html"><p class="project-brief">新学说国际学校项目数据库为您提供最新的土地资源、政策等方面的综合资讯，为您提供最权威，最细致的数据服务。</p></a>'+
                 '<div class="clearfix project-relese"><p class="fr"><span>发布单位：</span><span class="relese-name">北京新学说</span></p></div>'+
            '</div>'
        )
    }
}
//学校数据库
$(function () {
    $.ajax({
        type:"get",
        async:false,
        traditional :true,
        data: {
            'UserMail': $.cookie('username')
        },//提交的参数
        url:'http://'+changeUrl.address+'/School_api?whereFrom=mySubmitSearch',
        dataType : "jsonp",//数据类型为jsonp  
        jsonp: "Callback",//服务端用于接收callback调用的function名的参数  
        success : function(msg){
            console.log(msg)
            if(msg.msg == -2){
                $('#school_noAdd').removeClass('hide')
            }else{
                $('#school_noAdd').addClass('hide')
                createList01(msg)
            }

        },
        error:function(){
            alert('发生错误，请求数据失败！');
        }
    });
})

//机构数据库
$(function () {
    $.ajax({
        type:"get",
        async:false,
        traditional :true,
        data: {
            'UserMail': $.cookie('username')
        },//提交的参数
        url:'http://'+changeUrl.address+'/Institution_api?whereFrom=mySubmitSearch',
        dataType : "jsonp",//数据类型为jsonp  
        jsonp: "Callback",//服务端用于接收callback调用的function名的参数  
        success : function(msg){
            console.log(msg)
            if(msg.msg == -2){
                $('#institution_noAdd').removeClass('hide')
            }else{
                $('#institution_noAdd').addClass('hide')
                createList02(msg)
            }

        },
        error:function(){
            alert('发生错误，请求数据失败！');
        }
    });
})

//项目数据库
$(function () {
    $.ajax({
        type:"get",
        async:false,
        traditional :true,
        data: {
            'UserMail': $.cookie('username')
        },//提交的参数
        url:'http://'+changeUrl.address+'/Subject_api?whereFrom=mySubmitSearch',
        dataType : "jsonp",//数据类型为jsonp  
        jsonp: "Callback",//服务端用于接收callback调用的function名的参数  
        success : function(msg){
            console.log(msg)
            if(msg.msg == -2){
                $('#project_noAdd').removeClass('hide')
            }else {
                $('#project_noAdd').addClass('hide')
                createList03(msg)
            }

        },
        error:function(){
            alert('发生错误，请求数据失败！');
        }
    });
})




