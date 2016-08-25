/**
 * Created by acer on 2016/8/25.
 */
/**
 * Created by acer on 2016/8/21.
 */
// 这里面在index里面加载了jq所以这里也可以用
$(function () {
    function changeImage() {
        // 轮播图大小图背景设置
        var windowwidth = $(window).width();
        // 首先获取屏幕的尺寸 / 这里通过jq的方法获得屏幕尺寸/ 还有什么方法?????
        var isSmallScreen = windowwidth < 768;
        // 网页可见区域高 http://www.cnblogs.com/xiaopin/archive/2012/03/26/2418152.html
        //var isSmallScreen = document.body.offsetWidth < 768;
        // 根据屏幕尺寸来决定引入的背景图
        $('#main_ad > .carousel-inner > .item').each(function (index, ele) {
            // 每一项代表每一个盒子 循环回来的是一个dom对象需要转换
            //var $src = isSmallScreen ? $(ele).data('image-xs'):$(ele).data('image-lg');
            // jquery里面获取data属性 获取的是data后面的值；html5的是
            var $src = $(ele).data(isSmallScreen ? 'image-xs' : 'image-lg');
            $(ele).css('backgroundImage', 'url("' + $src + '")');
            if (isSmallScreen) {
                $(ele).html('<img src="' + $src + '"/>');
            } else {
                $(ele).empty();
            }
        })
        // tabs 卷轴判断
        var $touchScroll = $('.touch-scroll');
        var $touchUl =$('.touch-scroll ul');
        var $touchLi =$('.touch-scroll ul li')
        // 这里是屏幕小于tabs的总宽度再设置滚动条 但是需要动态设置;得到每个li的宽度再相加;ul有padding
        var $touchWidth = 50;
        $.each($touchLi,function(index,ele){
            $touchWidth += ele.clientWidth;
        })
        console.log($touchWidth);
        var screenXs = $(window).width() < $touchWidth;
        if(screenXs){
            $touchScroll.css('overflow-x','scroll');
            $touchUl.css('width',$touchWidth)
        }else {
            $touchScroll.css('overflow-x','hidden');
            $touchUl.css('width','auto');
        }
    }
    //resize(); 通过trigger的方式调用函数 ?????为什么可以直接调用resize函数;这里加括号和不加括号的区别是什么 可以CNM的这里函数居然名字只能是resize？？？？？？？？？？？？？？？？？？？？？？？？
    // 我草 这里trigger触发的是resize事件啊 不是这个函数我了个大潮
    $(window).on('resize', changeImage).trigger('resize');
    // 初始化tooltips插件
    $('[data-toggle="tooltip"]').tooltip();


    //新闻模块切换title
    var $newsTitle = $('#news .news-title');
    var $newsLi = $('#news .nav-pills li');
    $newsLi.on('click',function(){
        // 这里的this是一个dom对象；要使用.data()取出的是这个data对象集合；具体是哪一个要在里面用括号标示出来
        var $this = $(this);
        $newsTitle.text($this.data('title'));
    })

    // 轮播图手机端适配
    // 首先得到滑动起始坐标；监听轮播图滑动事件;找到轮播容器
    var start;
    var end;
    var $carousels = $('.carousel');
    $carousels.on('touchstart',function(e){
        // 因为可能存在多点触控所以触摸点为数组
        // console.log(e.originalEvent.touches[0].clientX);
        start = e.originalEvent.touches[0].clientX;
    })

    // 得到滑动中的点坐标
    $carousels.on('touchmove',function(e){
        //console.log(e.originalEvent.touches[0].clientX);
        // 使用重复赋值的方式在move中重置end的值
        end = e.originalEvent.touches[0].clientX;
    })

    // 在离开屏幕的时候判断 开始减去结束 正数则是向右 负数向左
    // 因为不需要太精确所以使用绝对值大于50px才触发事件
    var offset = 50;
    $carousels.on('touchend',function(){
        var result = Math.abs(start - end);
        if(result > offset){
            //console.log(start > end ? '→':'←');
            // 这里给所有的轮播图都注册了滑动事件；多个轮播图只能当前轮播变动
            $(this).carousel(start > end ? 'next':'prev');
        }
    })

});
