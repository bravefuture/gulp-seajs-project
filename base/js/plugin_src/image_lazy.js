/**
 * [图片延时加载 2.0]
 * @update: 2016.07.26
 * @author: Yc
 * html结构：
	<img src="/images/blank.gif" class="img-lazy" data-lazy="xx.jpg" width="800" height="500" alt=""/>
 * 	
 * 实例化
	var imgLazy = new ImageLazy('.img-lazy', {
		clickHover: '#clickHover', // 点击或移上该对象显示隐藏的图片
		additionalH: 0 // 一般情况下为0，如有大幅顶部广告图往下撑后又缩小成小广告图时，可设置相应的高度。
	    time: 100,
	    fadeInTime: 500
	});
 */
define(function(require, exports, module) {
	var	ImageLazy = function(selector, args) {
		// 获取dom
		this.$el = selector instanceof $ ? selector : $(selector);
		// 设置参数
		this.args = $.extend({
	        clickHover: null,
	        additionalH: 0,
	        time: 100,
	        fadeInTime: 500
		}, args || {});
		// 点击或移上该对象显示隐藏的图片
		this.$clickHover = this.args.clickHover instanceof $ ? this.args.clickHover : $(this.args.clickHover);
		// 存放符合要求且显示状态的图片队列
		this.listImg = [];
		// 存放符合要求且隐藏状态的图片队列
    	this.listHideImg = [];
    	// 取window对象
    	this.wind = $(window);
    	// 初始document高度
    	this.docH = $(document).height();
    	// 执行
    	this.saveImageData();
    	this.scrollResize();
	};
	ImageLazy.prototype = {
		// 存图片数据
		saveImageData: function() {	
			var that = this;		
			this.$el.each(function(i, v) {
				var item = $(v);
				if (item.data('lazy') !== 'undefined') {
					if (item.is(':visible')) {
						that.listImg.push({
							dom: item,
							top: item.offset().top
						});
					} else {
						that.listHideImg.push({
							dom: item
						});
					}
				}
			});
		},
		// 让图片加载显示
		showImage: function(top) {
			var that = this;
			$.each(this.listHideImg, function(i, v) {
				if (v && v.dom.is(':visible')) {
	                that.listImg.push({
	                    dom: v.dom,
	                    top: v.dom.offset().top
	                });
	                delete that.listHideImg[i];
	            }
			});
			$.each(this.listImg, function(i, v) {
	            if (v && v.top < top) {
	                var img = new Image();
	                img.onload = function() {
	                    if(v.dom.get(0).tagName.toLowerCase() !== 'img'){
	    					v.dom.css({
								backgroundImage: 'url('+v.dom.data('lazy')+')'
							}).hide().fadeIn(that.args.fadeInTime);
	    				}
	                    else{
	                        v.dom.attr('src', v.dom.data('lazy')).hide().fadeIn(that.args.fadeInTime);
	                    }
	                };
	                img.src = v.dom.data('lazy');
	                delete that.listImg[i];
	            }
	        });
		},
		// 改变window可见区域
		changeArea: function() {
			// document高度变化差值
			var docDif = $(document).height() - this.docH;
			this.showImage(this.wind.scrollTop() + this.wind.height() + this.args.additionalH - docDif);
		},
		// 拉动滚动条或改变窗口大小
		scrollResize: function() {
			var that = this,
				timer = null;
	        this.changeArea();
	        // 点击或移上显示图片
	        this.$clickHover.each(function(i, v) {
	        	var item = $(v);
	            item.on('click.lazy mouseover.lazy', function() {
	                setTimeout(function() {
	                    that.changeArea();
	                }, 100);
	            });
	        });
	        this.wind.on('scroll.lazy resize.lazy', function() {
	        	// 所有图片加载完毕
	        	if (that.listHideImg[that.listHideImg.length - 1] === undefined && that.listImg[that.listImg.length - 1] === undefined) {
	        		that.wind.off('scroll.lazy resize.lazy');
	        		return;
	        	}
	            if (timer) {
	                clearTimeout(timer);
	            }
	            timer = setTimeout(function() {
	                that.changeArea();
	            }, that.args.time);
	        });
		}
	};
	return ImageLazy;
});




