/**
 * [ScrollTop 2.0 返回顶部]
 * @author Yc
 * @created 2016.11.15
 * @update  2016.11.15
 * @param {[type]} args [description]
 * appTo: 'body',   把scrollWrap插入某个dom
 * scrollH  : 300,  滚动的高度超过该数值时出现top图片
 * speed : 500,     滚动速度
 * pos: 'rt',       设置位置
 * translateX: 10,  偏移值x     
 * translateY: 10,  偏移值y   
 * arrows: '',      箭头   
 * closeBtn: '',    关闭按钮   
 * scrDom : ''      srcDom结构
 */
define(function(require, exports, module) {

	var ScrollTop = function(args){
		var that = this;
		this.wind = $(window);
		// 设置参数
		this.args = $.extend({
			appTo: 'body',
			scrollH  : 300,
			itemScrollH: 0,
			itemShow: '.item-show',
			speed : 500,
			pos: 'rb',
			translateX: 50,
			translateY: 50,
			arrows: '',
			closeBtn: '',
			scrDom : '',
			scrInner: '.scrollTop',
			zIndex: 10
		} , (args || {}) );			
		// 执行函数		
		this.init();
	};
	ScrollTop.prototype = {
		// 是否为ie6
		isIE6: function() {
			return 'undefined' == typeof(document.body.style.maxHeight) ? true : false;
		},
		// 设置位置
		setPos: function(pos){
			var scrollWrapCss = {};
			switch(pos){
				case 'lt':
				scrollWrapCss = {
					'left': this.args.translateX,
					'top': this.args.translateY
				};
				break;
				case 'rt':
				scrollWrapCss = {
					'right': this.args.translateX,
					'top': this.args.translateY
				};
				break;
				case 'lb':
				scrollWrapCss = {
					'left': this.args.translateX,
					'bottom': -this.args.translateY - this.scrollWrapH
				};
				break;
				case 'rb':
				scrollWrapCss = {
					'right': this.args.translateX,
					'bottom': -this.args.translateY - this.scrollWrapH
				};
				break;
			}
			return scrollWrapCss;
		},
		// 生成结构
		buildST: function() {
			this.scrollWrap = $('<div></div>').css(this.setPos(this.args.pos));
			var pos = this.isIE6() ? 'absolute' : 'fixed';
			this.scrollWrap.css({'position': pos, 'z-index': this.args.zIndex});
			this.scrollWrap.append($(this.args.scrDom));
			this.scrollWrap.appendTo($(this.args.appTo));
			this.scrollWrapH = this.scrollWrap.height();
			this.scrInner = this.scrollWrap.find(this.args.scrInner);
		},
		// 绑定滚动、调整事件
		bindSR: function() {
			var that = this;
			/*定时器*/
			var timer = null;
			var scrollWrapH = this.scrollWrap.height();
			
			this.wind.on('resize.scrollTop scroll.scrollTop' , function(){
				if(timer){
					clearTimeout(timer);
				}
				timer = setTimeout(function(){
					if(that.isIE6()){
						if(that.args.pos === 'lt' || that.args.pos === 'rt' ){
							that.scrollWrap.css({
								top: that.wind.scrollTop() + that.args.translateY
							});
						}
						else if(that.args.pos === 'lb' || that.args.pos === 'rb' ){
							that.scrollWrap.css({
								top: that.wind.scrollTop()+ that.wind.height() - scrollWrapH - that.args.translateY
							});
						}
					}

					if (that.args.scrollH === 0 && that.args.itemScrollH > 0 && that.args.itemScrollH <= that.wind.scrollTop()) {
						$(that.args.itemShow).show();
					} else {
						$(that.args.itemShow).hide();
					}

					if( that.args.scrollH <= that.wind.scrollTop()){
						that.scrollWrap.children().show();
						if(navigator.userAgent.indexOf('Opera') != -1){
							that.scrollWrap.fadeIn().css({bottom: that.args.translateY});
						}
						else{
							that.scrollWrap.show().stop(true).animate({bottom: that.args.translateY});
						}						
					}
					else{
						that.scrollWrap.hide();
						that.scrollWrap.css({
							bottom: -that.args.translateY - scrollWrapH
						})
					}
					that.scrInner.off('click.ScrollTop');
					that.scrInner.on('click.ScrollTop', function(){
						var btm = (that.args.scrollH === 0 && that.args.itemScrollH > 0) ? that.args.translateY : that.wind.height() + that.wind.scrollTop();
						if(navigator.userAgent.indexOf('Opera') != -1){
							that.scrollWrap.css({bottom: btm});
							that.scrollWrap.css({
								bottom: -that.args.translateY - scrollWrapH
							});

							$('html').animate({ scrollTop : 0 } , that.args.speed);
						}
						else{
							if(!that.isIE6()){
								that.scrollWrap.stop(true, true).animate({bottom: btm}, 1000, function(){
									$(this).css({
										bottom: -that.args.translateY - scrollWrapH
									});
								});							
							}
							$('html, body').animate({ scrollTop : 0 } , that.args.speed);
						}						
						return false;
					});					
				}, 150); 			
			}).trigger('resize');
		},
		init: function(){
			this.buildST();	
			this.bindSR();
		}
	};	
	return ScrollTop;
});
	
