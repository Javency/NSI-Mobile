//自动滚动
function autoScroll(obj) {
    var oHeight = -$(obj).height()
    $(obj).find('.siteNews_list').animate({
        marginTop:oHeight
    },1000,function () {
        $(this).css({
            marginTop:"0px"
        }).find("li:first").appendTo(this)
    })
}



var onOff = true
//左侧汉堡按钮
function leftBtn() {
    if(onOff){
        $('.siteHeader_other').fadeIn()
        onOff = false
    }else {
        $('.siteHeader_other').fadeOut()
        onOff = true
    }
}

//点击显示搜索框
$('#scroll02').click(function () {
    $('#searchBox').removeClass('hide')
})
//点击隐藏搜索框
$('#indexBack').click(function () {
    $('#searchBox').addClass('hide')
})

//点击下拉选项
$('#chooseList li').click(function () {
    var index = $(this).index()
    console.log(index)
    $("#selectList").val(index)
    $('#chooseList').addClass('hide')
    $('#hotSearch').removeClass('hide')
})

//点击下拉框
$('#selectList').click(function () {
    $('#chooseList').removeClass('hide')
    $('#hotSearch').addClass('hide')
})

//首页搜索  (按照不同选项跳转到不同页面)
$('#indexSearch').click(function () {
    alert($("#selectList").val())

    var num = $("#selectList").val()

    if( num == 0){
        var searchVal = $('#search').val()
        window.location.href='./school/search.html?whereFrom='+searchVal
    }
    if( num == 1){
        var searchVal = $('#search').val()
        window.location.href='./institution/search.html?whereFrom='+searchVal
    }


})


$(function () {
   // 自动滚动
   setInterval(function () {
       autoScroll(".siteNews")
   },2000)
    // 搜索框显示隐藏
    searchScroll()
    //返回
    $('.siteHeader_left').click(function () {
        leftBtn()
    })
})







