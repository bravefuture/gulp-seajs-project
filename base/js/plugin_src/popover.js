/**
 * [Popover 弹出层]
 * @author Yc
 * created 2016.11.15
 * update  2016.11.15
 * @param {[type]} selector [description]
 * @param {[type]} args     [description]
 * event: 'hover'         默认为鼠标移上事件，反则为点击事件
 * effect: '' / 'slide'   默认为渐变，slide为下拉显示
 * sLayer: ''             要显示那个层 
 * on: ''                 选中状态的class
 * showCb: function(){}   显示后回调函数
 * hideCb: function(){}   隐藏后回调函数
 */
define(function(require, exports, module) {	
	var Popover = function(selector , args){
		var that = this;
		// 取dom
		this.dom = selector instanceof $ ? selector : $(selector);
		// 设置参数
		this.args = $.extend({
			event: 'hover',
			effect: '',
			speed: 150,
			sLayer: '',
			on: '',
			showCb: function(){},
			hideCb: function(){}
		} , args || {});
		// 要显示的那个层
		var layer = this.args.sLayer;			
		this.layer = layer instanceof $ ? layer : $(layer);
		// 判断是否是ie6  $ 1.9以上版本不再支持$.browser
		this.isIE6 = 'undefined' == typeof(document.body.style.maxHeight) ? true : false;
		// 在ie6添加iframe
		this.addIframe();
		// 执行事件
		this.args.event == 'hover' ? this.hoverFn() : this.clickFn();
	};
	Popover.prototype = {
		// hover事件
		hoverFn: function(){
			var that = this;
			var timer = null;
			
			this.dom.add(this.layer).hover(
				function(){
					clearTimeout(timer);
					if(that.args.effect == 'slide'){
						that.layer.animate({ height: 'show'}, that.args.speed);
					}
					else{
						that.layer.fadeIn(that.args.speed);
					}
					that.iframeSH().show(that.args.speed);				
					that.dom.addClass(that.args.on);
					that.args.showCb();				
				},
				function(){
					timer = setTimeout(function(){
						that.layer.hide();
						that.iframeSH().hide();					
						that.dom.removeClass(that.args.on);
						that.args.hideCb();
					}, 500);
				}
			);
			
		},
		// 点击事件
		clickFn: function(){
			var that = this;

			var showL = function(){
				that.dom.addClass(that.args.on);
				that.chooseEffect(that.layer);				
				that.iframeSH().show();
				that.args.showCb();
			};

			var hideL = function(){
				that.dom.removeClass(that.args.on);
				that.layer.hide();
				that.iframeSH().hide();
				that.args.hideCb();
			};
			
			var toggle = function(){
				that.dom.on('click.first', function(e){
					showL();
					that.dom.off('click.first');
					that.dom.on('click.second', function(e){
						hideL();
						that.dom.off('click.second');
						toggle();
						e.stopPropagation();
					});
					e.stopPropagation();
				});
			};

			toggle();
					
			this.layer.on('click', function(e){
				e.stopPropagation();
			});
			
			$(document).on('click', function(){
				if(that.layer.is(':visible')){
					that.dom.trigger('click');
				}
				return false;
			});
		},
		// 当页面存在select时,解决IE6 BUG
		addIframe: function(){
			if(this.isIE6){
				var iframeW = this.layer.outerWidth();
				var iframeH = this.layer.outerHeight();
				var iframeT = this.layer.css('top');
				var iframeL = this.layer.css('left');
				
				var iframeCss = {
					position: 'absolute',
					display: 'none',
					width: iframeW,
					height: iframeH,
					top: iframeT,
					left: iframeL
				};
				
				var iframe = $('<iframe scrolling="no" class="overSelect"></iframe>'); 
				iframe.css(iframeCss).insertBefore(this.layer);				
			}
		},
		// 在IE6显示隐藏iframe
		iframeSH: function(){
			var that = this;
			return {
				show: function(){
					if(that.isIE6){
						that.chooseEffect(that.layer.prev('.overSelect'));
					}
				},
				hide: function(){
					if(that.isIE6){
						that.layer.prev('.overSelect').hide();
					}
				}
			};
		},
		// 选择效果
		chooseEffect: function(dom){
			if(this.args.effect == 'slide'){
				dom.animate({ height: 'show'}, this.args.speed);
			}
			else{
				dom.fadeIn(this.args.speed);
			}
		}
	};
	return Popover;
});

