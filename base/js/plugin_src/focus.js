/**
 * [Focus 2.0 轮播图]
 * @author Yc
 * @created 2016.11.15
 * @update  2016.11.15
 * @param {[type]} selector [description]
 * @param {[type]} args     [description]
 * speed: 300, //轮播速度
 * time: 5000, //轮播间隔
 * autoPlay: false, //是否自动播放
 * center: false //是否居中
 */
define(function(require, exports, module) {	
	var Focus = function(selector, args){
		var that = this;
		// 获取dom
		this.dom = selector instanceof $ ? selector : $(selector);
		// 设置参数
		this.args = $.extend({
			listCN: '.focus-list',
			dotCN: '.focus-dot',
			dotCenter: true,
			leftBtnCN: '.left-btn',
			rightBtnCN: '.right-btn',
			speed: 300, 
			time: 5000, 
			autoPlay: false,
			center: false, // 当为true时，需在样式表设置this.dom的宽度
			needNum: true
		}, args || {});	

		this.init();
	};
	Focus.prototype = {
		// 执行
		init: function(){
			// 获取元素
			var that = this;
			this.list = this.dom.find(this.args.listCN);
			this.listChild = this.list.children();

			this.domW = this.dom.width();
			this.listChildLen = this.listChild.length;
			this.listChildW = this.listChild.width();
			this.listChild.eq(0).css({zIndex: 2});

			// 是否居中，主要用于宽屏图片
			if(this.args.center === true){
				this.picCenter();
			}

			// 执行左右按钮事件
			this.leftBtn = this.dom.find(this.args.leftBtnCN);
			this.rightBtn = this.dom.find(this.args.rightBtnCN);
			this.lRBtn();

			if(this.listChildLen < 2){
				this.leftBtn.hide();
				this.rightBtn.hide();
				return;
			}
			this.index = 0;
			this.prevIndex = 0;
			this.autoTimer = null;
			
			// 执行"点"列表
			this.buildDot();
			var focusDot = this.dom.find(this.args.dotCN),
				fDW = focusDot.width();
			if (this.args.dotCenter === true) {
				focusDot.css({
					left: '50%',
					marginLeft: -fDW / 2
				});
			}
			this.dot = focusDot.find('a');
			this.dotClick();
			this.dot.eq(0).trigger('click');

			// 是否自动播放
			if(this.args.autoPlay == true){
				this.auto();
				this.mHover();
			}

			this.dom.hover(
				function(){
					that.leftBtn.show();
					that.rightBtn.show();
				},
				function(){
					that.leftBtn.hide();
					that.rightBtn.hide();
				}
			);
		},
		// 重构"点"列表
		buildDot: function(){
			var focusDotData = ['<div class="'+ this.args.dotCN.substring(1) +'">'];
			for (var i = 0; i < this.listChildLen; i++) {
				var num = this.args.needNum ? i + 1 : '';
				focusDotData.push('<a href="javascript:void(0)">'+ num +'</a>');
			}
			focusDotData.push('</div>');
			this.dom.append(focusDotData.join(''));
		},
		// 渐变
		fade: function(index, callback){
			callback = callback || function(){};
			this.listChild.eq(index).siblings().css({zIndex: 1}).animate({opacity: 0}, this.args.speed);
			this.listChild.eq(index).css({zIndex: 2}).show().animate({opacity: 1}, this.args.speed, function(){
				callback();
			});
		},
		// 绑定"点"事件
		dotClick: function(){
			var that = this;
			this.dot.eq(0).addClass('on');
			var btn = true;		
			this.dot.on('click', function(){
				if(btn === true){
					btn = false
					var _this = $(this);
					_this.addClass('on').siblings().removeClass('on');
					var index = _this.index();
					that.index = index;
					that.fade(index, function(){
						btn = true;
					});
					that.prevIndex = index;					
				}
				return false;				
			});
		},
		// 左右按钮事件
		lRBtn: function(){
			var that = this,
				btn1 = true,
				btn2 = true;
			this.rightBtn.on('click', function(){
				clearInterval(that.autoTimer);
				if(btn1 === true){
					btn1 = false;
					that.index++;
					if (that.index == that.listChildLen) {
			            that.index = 0;
			        }
					that.fade(that.index, function(){
						btn1 = true;
					});
					that.dot.eq(that.index).addClass('on').siblings().removeClass('on');
				}
				return false;
			});
			this.leftBtn.on('click', function(){
				clearInterval(that.autoTimer);
				if(btn2 === true){
					btn2 = false;
					that.index--;
					if (that.index == -1) {
			            that.index = that.listChildLen - 1;
			        }
					that.fade(that.index, function(){
						btn2 = true;
					});
					that.dot.eq(that.index).addClass('on').siblings().removeClass('on');		
				}
				return false;
			});
		},
		// 居中
		picCenter: function(){
			var that = this;
			$(window).on('resize.Focus', function(){
				console.log(that.domW)
			console.log(($(window).width() - that.domW) / 2)
				that.dom.css({
					marginLeft: ($(this).width() - that.domW) / 2
				});
			}).resize();
		},
		// 自动播放
		auto: function(){
			var that = this;
			this.autoTimer = setTimeout(function(){
				that.rightBtn.click();
				that.autoTimer = setTimeout(arguments.callee, that.args.time);			
			}, this.args.time)
		},
		// 移上清除播放，移出执行播放
		mHover: function(){
			var that = this;
			this.dom.hover(
				function(){
					clearInterval(that.autoTimer);
				},
				function(){
					that.auto();
				}
			);			
		}	
	};
	return Focus;
});
