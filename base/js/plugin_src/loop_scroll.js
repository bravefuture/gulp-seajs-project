/**
 * [图片循环滚动 2.0 切换]
 * @author Yc
 * created 2016.11.17
 * update  2016.11.25
 * @param {[type]} selector [description]
 * @param {[type]} args     [description]
 * speed : 300,    速度
 * autoPlay: true, 自动播放
 * time: 3000      滚动间隔
 */
define(function(require, exports, module) {	
	var LoopScroll = function(selector, args){
		// 获取dom
		this.dom = selector instanceof $ ? selector : $(selector);		
		// 设置参数
		this.args = $.extend({
			speed: 200,
			autoPlay: false,
			time: 3000,
			leftBtn: '.loop-left-btn',
			rightBtn: '.loop-right-btn',
			innerScroll: '.loop-scroll-inner'
		}, args || {});

		this.init();
	};
	LoopScroll.prototype = {
		// 执行
		init: function() {	
			var that = this;			
			// 左右按钮
			this.leftBtn = this.dom.find(this.args.leftBtn);
			this.rightBtn = this.dom.find(this.args.rightBtn);
			
			this.innerScroll = this.dom.find(this.args.innerScroll);
			this.inScW = this.innerScroll.width();

			this.li = this.innerScroll.find('li');	
			this.liW = this.li.outerWidth(true);
			this.originalLiLen = this.li.length;

			this.ul = that.innerScroll.find('ul');
			
			// 显示图片个数
			this.loadLen = Math.floor(this.inScW / this.liW);
			if (this.originalLiLen <= this.loadLen) {
				this.leftBtn.hide();
				this.rightBtn.hide();
				return;
			}
			this.ul.append(that.ul.html());
			this.bindLR();	
				
			// 是否自动播放		
			if(this.args.autoPlay == true){
				this.auto();
			}
		},
		// 重构
		bindLR: function(){
			var that = this,			
				ul = this.ul,			
			    liLen = ul.find('li').length,
			    liW = ul.find('li').outerWidth(true);			
			// 设置ul宽度
			ul.width(liLen * liW);	
					
			// 显示li个数
			var showLi = Math.ceil(this.inScW / liW);			
			// 返回点
			var	centerNum = liLen / 2,	
				i = 0;		
			if(showLi < liLen){
				var btnL = true;
				this.leftBtn.on('click', function(){
					if (btnL === true) {
						btnL = false;
						if(i == 0){
							ul.css('marginLeft', -centerNum * liW);
							i = centerNum;
						}
						ul.stop(true, true).animate({'marginLeft': -(i - 1) * liW}, that.args.speed, function(){
							btnL = true;
							i--;
							if(i == 0){
								ul.css('marginLeft', -centerNum * liW);
								i = 0;
							}
							if (i < 0) {
								i = centerNum - 1;
							}
						});	
						return false;					
					}
				});			
				var btnR = true;
				this.rightBtn.on('click', function(){
					if (btnR === true) {
						btnR = false;
						if(i == 0){
							ul.css('marginLeft', 0);
							i = 0;					
						}
						ul.stop(true, true).animate({'marginLeft': -(i + 1) * liW}, that.args.speed, function(){
							btnR = true;
							i++;
							if(i == centerNum){
								ul.css('marginLeft', 0);
								i = 0;				
							}		
						});	
						return false;				
					};
				});		
			}				
		},
		// 自动播放
		auto: function(){
			var that = this,
				timer = null,
				setFn = function(){
				that.leftBtn.click();
			};		
			timer = setInterval(setFn, this.args.time);			
			this.dom.find('li').add(this.leftBtn).add(this.rightBtn).hover(
				function(){
					if(timer){
						clearInterval(timer);
					}
				},
				function(){
					timer = setInterval(setFn, that.args.time);
				}
			);			
		}
	};
	return LoopScroll
});
