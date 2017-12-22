$(function () {
    searchScroll()
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

//创建列表
function createList(msg) {
    for(var i=0;i<msg.length;i++){
        $('#listWrap').append(
        '<div class="siteSearch_list">'+
            '<div class="project-show">'+
            '<img src="../images/project/triangle.png" alt="三角图标" class="triangle">'+
            ' <a href="./detail.html?School_name='+msg[i].Id+'&whereFrom=search"><img src="../images/project/nsi_project.jpg" alt="热门项目" class="project-img"></a>'+
            '</div>'+
            '<p class="project-name">'+msg[i].SubjectName+'</p>'+
            ' <a href="./detail.html?School_name='+msg[i].Id+'&whereFrom=search"><p class="project-brief">'+msg[i].SubjectIntroduction+'</p></a>'+
            '<div class="clearfix project-relese"><p class="fr"><span>发布单位：</span><span class="relese-name">'+msg[i].Company+'</span></p></div>'+
        '</div>'
        )
    }
}

//搜索机构
function searchProject() {
    var passVal = $('#searchContent').val()
    $.ajax({
        type : "get",
        async:true,
        traditional :true,
        data: {
            'SearchKey':passVal,
            'pageNum':1,
            'OnePageNum':20
        },//提交的参数
        url:"http://"+changeUrl.address+"/Subject_api?whereFrom=count",//获取搜索的总条数
        dataType:"jsonp",//数据类型为jsonp  
        jsonp: "Callback",//服务端用于接收callback调用的function名的参数  
        success : function(data){
            console.log(data)
            $('#resultNum').text(data.countAllRS)
            var totalCount =data.countAllRS ;
            //分页
            layui.use(['laypage'],function () {
                var laypage = layui.laypage //分页
                //分页
                laypage.render({
                    elem: 'pageDemo' //分页容器的id
                    ,count: totalCount //总页数
                    ,limit:20
                    ,skin: '#1E9FFF' //自定义选中色值
                    ,groups:1
                    ,prev: '<em class="layui-icon"> &#xe603; </em>'
                    ,next: '<em class="layui-icon"> &#xe602; </em>'
                    //,skip: true //开启跳页
                    ,jump: function(obj, first){
                        $('#listWrap').html('')
                        var passVal = $('#searchContent').val()
                        var data01 ={
                            'SearchKey':passVal ,
                            'pageNum': obj.curr,
                            'OnePageNum':20
                        }
                        if(data.countAllRS != 0){
                            myAjax(data01,"http://"+changeUrl.address+"/Subject_api?whereFrom=search",createList)
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
$('#projectSearch').click(function () {
    $('#searchBox').addClass('hide')
    searchProject()
})

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
        'Subject_api':datailSchool,
        'pageNum': 1,
        'OnePageNum':20
    }
    $('#searchContent').val(datailSchool)
    $('#listWrap').html('')
    myAjax(data01,'http://'+changeUrl.address+'/Subject_api?whereFrom=search',searchProject)
}

$(function () {
    initSearch()
})

