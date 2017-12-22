//头部搜索效果
$(function () {
    searchScroll()
})

//新增数据显示隐藏
$(function () {
    $(window).scroll(function () {
        if($(this).scrollTop()>100){
             $('#site_addData').animate({
                 opacity:1
             },0)
        }else {
            $('#site_addData').animate({
                opacity:0
            },0)
        }
    })
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


//机构搜索  (跳转到搜索列表页面)
$('#schoolSearch').click(function () {
    var searchVal = $('#search').val()
    window.location.href='./search.html?whereFrom='+searchVal
})
