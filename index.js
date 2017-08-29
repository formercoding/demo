(function() { // 首页全屏滚动
    let os = function() {  
        var ua = navigator.userAgent,  
        isWindowsPhone = /(?:Windows Phone)/.test(ua),  
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,   
        isAndroid = /(?:Android)/.test(ua),   
        isFireFox = /(?:Firefox)/.test(ua),   
        isChrome = /(?:Chrome|CriOS)/.test(ua),  
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),  
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,  
        isPc = !isPhone && !isAndroid && !isSymbian;  
        return {  
             isTablet: isTablet,  
             isPhone: isPhone,  
             isAndroid : isAndroid,  
             isPc : isPc  
        };  
    }();
    // 移动端退出
    if(!os.isPc) {
        console.log(os.isPc);
        return false;
    }
    const Body = document.body;
    // firefox
    if(document.addEventListener) {
        document.addEventListener('DOMMouseScroll', scrollFunc, false);
    }
    // ie/opera/chrome
    window.onmousewheel = document.onmousewheel = scrollFunc;

    let order = 0;
    let timer;
    let finalH = 0;
    let start = new Date().getTime();
    let end = new Date().getTime();
    // 全屏滚动函数 
    function scrollFunc(event) {
        event = event || window.event;
        event.preventDefault();
        let flag = 0;
        start = new Date().getTime();
        if(start - end > 400) { // 对鼠标滑动进行时间控制，防止一次切换多屏
            if(event.wheelDelta) { // w3c
                if(event.wheelDelta > 0) {
                    flag = -1;
                } else {
                    flag = 1;
                }
            } else if(event.detail){ // firefox
                if(event.detail > 0) {
                    flag = -1;
                } else {
                    flag = 1;
                }
            }
            end = new Date().getTime();
            // 滑动屏幕，用另外的函数主要为了切换屏幕的扩展性
            scrollTo(flag); 
        } 
    }

    // 切换屏幕
    function scrollTo(flag) { // chrome下documentElement无效
        if(timer) { // 判断动画是否还在进行，使动画瞬间到达
            document.body.scrollTop = finalH;
            clearInterval(timer);
        }
        order = flag + order;
        let screenH = window.innerHeight;
        finalH = screenH * order;
        if(document.body.clientHeight - screenH < finalH && order < 0) { // 底部控制
            return false;
        }
        timer =  setInterval(() => {
            let delta = parseInt((finalH - document.body.scrollTop) / 3);
            if(Math.abs(delta) <= 1) {
                document.body.scrollTop = finalH;
                clearInterval(timer);
            } else {
                document.body.scrollTop = document.body.scrollTop + delta;
            }
        }, 50)
    }
})();

