$(function () {
    searchScroll()
})

//查看更多
$('.clickForMore').click(function () {
    $('.moreArea').css('display','block')
    $('.clickForSlidedown').css('display','block')
    $('.baseArea').css('display','none')
    $(this).css('display','none')
    $('#AdvanceResetID').trigger('click')
})

$('.clickForSlidedown').click(function () {
    $('.moreArea').css('display','none')
    $('.clickForMore').css('display','block')
    $('.baseArea').css('display','block')
    $(this).css('display','none')
    $('#AdvanceResetID').trigger('click')
})

//点击显示搜索框
$('#scroll02').click(function () {
    $('#searchBox').removeClass('hide')
    $('html,body').animate({scrollTop:0},0)
})

//点击隐藏搜索框
$('#goBack').click(function () {
    $('#searchBox').addClass('hide')
})

//过滤函数（如果为零，自动补暂无）
function zeroToEmpty( str ) {
    var strFilter = null;
    return strFilter = (str == 0)? '  ' : str;
}


function createList(msg) {
    for(var i=0;i<msg.length;i++){
        var imgSrc = msg[i].School_logo ? 'http://'+changeUrl.imgAddress+msg[i].School_logo : '../images/public/nsi_nopic.png';
        $('#listWrap').append(
        '<div class="siteSearch_list clearfix">'+
            '<div class="fl"><a href="./detail.html?School_name='+msg[i].Id+'&whereFrom=search"><img src="'+imgSrc+'" alt="学校" class="school-img"></a></div>'+
                '<div class="fl school-info">'+
                '<a href="./detail.html?School_name='+msg[i].Id+'&whereFrom=search"><h4 class="school-name">'+zeroToEmpty(msg[i].School_name)+'</h4></a>'+
                '<p class="school-type">学制：<span>'+zeroToEmpty(msg[i].School_system)+'</span></p>'+
                '<p class="school-course">课程：<span>'+zeroToEmpty(msg[i].Course)+'</span></p>'+
                '<p class="school-course">类型：<span>'+zeroToEmpty( msg[i].School_properties )+'</span></p>'+
            '</div>'+
        '</div>'
        )
    }
}

//搜索学校
function searchSchool() {
    var passVal = $('#searchContent').val()
    $.ajax({
        type : "get",
        async:true,
        traditional :true,
        data: {
            'School_searchKey':passVal,
            'pageNum':1,
            'OnePageNum':20
        },//提交的参数
        url:"http://"+changeUrl.address+"/School_api?whereFrom=count",//获取搜索的总条数
        dataType:"jsonp",//数据类型为jsonp  
        jsonp: "Callback",//服务端用于接收callback调用的function名的参数  
        success : function(data){
            console.log(data)
            $('#schoolNum').text(data.countAllRS)
            var totalCount =data.countAllRS ;
            //分页
            layui.use(['laypage'],function () {
                var laypage = layui.laypage //分页
                //分页
                laypage.render({
                    elem: 'pageDemo' //分页容器的id
                    ,count: totalCount //总页数
                    ,skin: '#1E9FFF' //自定义选中色值
                    ,groups:1
                    ,prev: '<em class="layui-icon"> &#xe603; </em>'
                    ,next: '<em class="layui-icon"> &#xe602; </em>'
                    //,skip: true //开启跳页
                    ,jump: function(obj, first){
                        $('#listWrap').html('')
                        var passVal = $('#searchContent').val()
                        var data01 ={
                            'School_searchKey':passVal ,
                            'pageNum': obj.curr,
                            'OnePageNum':20
                        }
                        if(data.countAllRS != 0){
                            myAjax(data01,"http://"+changeUrl.address+"/School_api?whereFrom=search",createList)
                        }
                    }
                });
            })
        },
        error:function(){
            alert('请求数据失败！');
        }
    });
}

//普通搜索
$('#goSearch').click(function () {
    $('#searchBox').addClass('hide')
    searchSchool()
})
//高级搜索
$('#AdvanceSubmitID').click(function () {
    $('#searchBox').addClass('hide')
    advanceSearch()
    return false;
})

//高级搜索
function advanceSearch(){
    $('#listWrap').html('')
    var area = ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
        eduSystem = ['0','0','0','0'],
        course = ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
        buildSchoolTime = ($('#buildSchoolTime').val() =='' ? 0 : $('#buildSchoolTime').val()).toString()
    $('#AdvanDivID01 input:checkbox:checked').each(function() {
        area[$(this).val()-1] = $(this).val()
    });
    $('#AdvanDivID02 input:checkbox:checked').each(function() {
        eduSystem[$(this).val()-1] = $(this).val()
    });
    $('#AdvanDivID03 input:checkbox:checked').each(function() {
        course[$(this).val()-1] = $(this).val()
    });
    $.ajax({
        type: 'get',//提交方式 post 或者get
        async:true,
        traditional :true,    //必须加上该句话来序列化
        dataType:'jsonp',
        data: {
            'area':area,
            'system':eduSystem,
            'course':course,
            'Founded_time':buildSchoolTime
        },//提交的参数
        jsonp:'Callback',
        url: "http://"+changeUrl.address+"/School_api?whereFrom=AdvancedSearchCount",//提交到那里 后他的服务
        success:function(data){
            console.log(data)
            $('#schoolNum').text(data.countAllRS)
            var totalCount =data.countAllRS ;
            //分页
            layui.use(['laypage'],function () {
                var laypage = layui.laypage //分页
                //分页
                laypage.render({
                    elem: 'pageDemo' //分页容器的id
                    ,count: totalCount //总页数
                    ,skin: '#1E9FFF' //自定义选中色值
                    ,limit:20
                    ,groups:1
                    ,prev: '<em class="layui-icon"> &#xe603; </em>'
                    ,next: '<em class="layui-icon"> &#xe602; </em>'
                    //,skip: true //开启跳页
                    ,jump: function(obj, first){
                        $('#listWrap').html('')
                        var passVal = $('#searchContent').val()
                        var data01 ={
                            'School_searchKey':passVal ,
                            'pageNum': obj.curr,
                            'OnePageNum':20
                        }
                        if(data.countAllRS != 0){
                            myAjax(data01,"http://"+changeUrl.address+"/School_api?whereFrom=search",createList)
                        }
                    }
                });
            })
        },
        error:function(){
            alert('请求数据失败')
        }
    });
};


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

//别的页面搜索过来
function initSearch() {
    var args =getQueryStringArgs();
    var datailSchool = decodeURIComponent(args['whereFrom'])
    var data01 = {
        'School_searchKey':datailSchool,
        'pageNum': 1,
        'OnePageNum':20
    }
    $('#searchContent').val(datailSchool)
    $('#listWrap').html('')
    myAjax(data01,'http://'+changeUrl.address+'/School_api?whereFrom=search',searchSchool)
}

$(function () {
    initSearch()
})








