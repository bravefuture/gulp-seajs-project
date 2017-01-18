/**
 * [scrollShowInit 滚动到可视窗口执行]
 * @author Yc
 * @created 2016.11.18
 * @update  2016.11.18
 * @param  {[type]} target [dom位置]
 * @param  {[type]} callback  [回调函数]
 * @param  {[type]} one  [是否只执行一次]
 * @param  {[type]} time  [定时器时间]
 */
define(function(require, exports, module) {
    var scrollShowInit = function(target, callback, one, time) {
	    var win = $(window),
	    	timer = null;
    	callback = callback || function() {};
    	// 是否只执行一次
    	one = one || true;
    	var isCallback = false;
    	win.on('scroll.scrollShowInit resize.scrollShowInit', function() {
    		// 执行一次
    		if (one === true && isCallback === true) {
    			return;
    		}
    		var _this = $(this);
    		if (timer) {
    			clearTimeout(timer);
    		}
    		timer = setTimeout(function() {
        		var winST = _this.scrollTop(),
        			winH = _this.height(),
        			targetOT = target.offset().top;
        		if (winST + winH >= targetOT) {
    				callback();
    				isCallback = true;
        		}
    		}, time || 150);
    	}).trigger('scroll');
    };
	return scrollShowInit;
});