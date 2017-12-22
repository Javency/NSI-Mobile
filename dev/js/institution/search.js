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
        var imgSrc = msg[i].Institution_logo ? (msg[i].Institution_logo !=0 ? 'http://'+changeUrl.imgAddress+msg[i].Institution_logo : '../images/public/nsi_nopic.png') : '../images/public/nsi_nopic.png';
        $('#listWrap').append(
            '<div class="siteSearch_list clearfix">'+
                '<div class="fl"><a href="./detail.html?School_name='+msg[i].Id+'&whereFrom=search"><img src="'+imgSrc+'" alt="机构" class="institution-img"></a></div>'+
                '<div class="fl institution-info">'+
                '<a href="./detail.html?School_name='+msg[i].Id+'&whereFrom=search"><h4 class="institution-name">'+zeroToEmpty(msg[i].Name)+'</h4></a>'+
                '<p class="institution-lable">标签：<span>'+zeroToEmpty(msg[i].Label)+'</span></p>'+
                '<p class="institution-type">类型：<span>'+zeroToEmpty(msg[i].Type)+ '</span></p>'+
                '<p class="institution-time">成立时间：<span>'+zeroToEmpty(msg[i].Founded_time)+'</span></p>'+
                '</div>'+
           '</div>'
        )
    }
}


//搜索机构
function searchInstitution() {
    var passVal = $('#searchContent').val()
    $.ajax({
        type : "get",
        async:true,
        traditional :true,
        data: {
            'Institution_searchKey':passVal,
            'pageNum':1,
            'OnePageNum':20
        },//提交的参数
        url:"http://"+changeUrl.address+"/Institution_api?whereFrom=count",//获取搜索的总条数
        dataType:"jsonp",//数据类型为jsonp  
        jsonp: "Callback",//服务端用于接收callback调用的function名的参数  
        success : function(data){
            console.log(data)
            $('#institutionNum').text(data.countAllRS)
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
                            'Institution_searchKey':passVal ,
                            'pageNum': obj.curr,
                            'OnePageNum':20
                        }
                        if(data.countAllRS != 0){
                            myAjax(data01,"http://"+changeUrl.address+"/Institution_api?whereFrom=search",createList)
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
$('#institutionSearch').click(function () {
    $('#searchBox').addClass('hide')
    searchInstitution()
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
        'Institution_searchKey':datailSchool,
        'pageNum': 1,
        'OnePageNum':20
    }
    $('#searchContent').val(datailSchool)
    $('#listWrap').html('')
    myAjax(data01,'http://'+changeUrl.address+'/Institution_api?whereFrom=search',searchInstitution)
}

$(function () {
    initSearch()
})







