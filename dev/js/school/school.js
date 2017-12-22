//搜索框显示
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


//学校搜索  (跳转到搜索列表页面)
$('#schoolSearch').click(function () {
        var searchVal = $('#search').val()
        window.location.href='./search.html?whereFrom='+searchVal
})

