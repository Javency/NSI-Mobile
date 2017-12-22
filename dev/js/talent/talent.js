//头部搜索效果
$(function () {
    searchScroll()
})

//新增数据显示隐藏
$(function () {
    $(window).scroll(function () {
        console.log($(this).scrollTop());
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
