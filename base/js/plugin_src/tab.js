/**
 * [Tab 2.0 切换]
 * @author Yc
 * created 2016.11.15
 * update  2016.11.15
 * @param {[type]} selector [description]
 * @param {[type]} args     [description]
 * tabTop: '.tab-top'
 * tabCont: '.tab-cont'
 * selectedCN: 'on' 选中类名
 * event: click/mouseenter
 * autoPlay: false/true
 * time: 默认为5秒
 * effect: ''/'fade'/'slide' 默认/渐变/滑动
 * speed: 300 速度
 * 示例：
 * html =>
 * <div id="tab">
        <ul class="tab-top">
            <li class="on">tab1</li>
            <li>tab2</li>
        </ul>
        <div class="tab-cont">
            <div>tab1_cont</div>
            <div style="display:none;">tab2_cont</div>
        </div>
    </div>
	js =>
    seajs.use(['base/js/plugin/tab'], function(Tab) {
    	new Tab('#tab');	
    });
 */
define(function(require, exports, module) {
	var Tab = function(selector, args){
		var that = this;		
		// 获取dom
		this.dom = selector instanceof $ ? selector : $(selector);		
		// 设置参数
		this.args = $.extend({
			tabTop: '.tab-top',
			tabCont: '.tab-cont',
			selectedCN: 'on',
			event: 'click',
			autoPlay: false,
			time: 5000,
			effect: '',
			speed: 300,
			outHide: false,
			follow: false
		}, args || {});

		this.init();
	};
	Tab.prototype = {
		// 执行
		init: function() {
			this.index = 0;
		    // 取dom
			this.topChild = this.dom.find(this.args.tabTop + ':first').children();
			this.contChild = this.dom.find(this.args.tabCont + ':first').children();
			this.topChildLen = this.topChild.length;				
			// 长度小于2,不执行下面的函数
			if(this.topChildLen < 2){
				return;
			}
			// 默认状态
			this.defTab();
			// 是否自动播放
			if (this.args.autoPlay) {
				this.auto();
			}
		},
		// 选中状态
		selected: function(dom, index) {
			dom.addClass(this.args.selectedCN).siblings().removeClass(this.args.selectedCN);
			this.setEffect(this.args.effect, index);
		},
		// 默认状态
		defTab: function(){
			var that = this;
			// topChild绑定事件
			this.topChild.each(function(){
				var _this = $(this),
					posTop = _this.position().top;				
				_this[that.args.event](function(){
					that.index = _this.index();
					that.selected(_this, _this.index());
					// 用于菜单功能
					if (that.args.outHide === true && that.args.follow === true) {
						that.dom.find(that.args.tabCont + ':first').css({
							top: posTop
						});
					}
				});
				// 自定义选中状态
				if (_this.is('.' + that.args.selectedCN)) {
					that.args.event === 'click' ? _this.trigger('click') : _this.trigger('mouseenter');
				}
			});
			// 用于菜单功能
			if (this.args.outHide === true) {
				this.topChild.on('mouseleave', function() {
					that.topChild.removeClass(that.args.selectedCN);
					that.contChild.hide();			
				});
				this.contChild.on('mouseover', function() {
					that.topChild.eq(that.index).addClass(that.args.selectedCN);
					that.contChild.eq(that.index).show();
				});
				this.contChild.on('mouseleave', function() {
					that.topChild.removeClass(that.args.selectedCN);
					that.contChild.hide();
				});
			}
		},
		// 自动播放
		auto: function(){
			var that = this,
				timer = null;
			// 播放函数			
			var autoFn = function(){
				if (that.index == that.topChildLen - 1) {
					that.index = -1;
				}
				that.index++;
				that.selected(that.topChild.eq(that.index), that.index);
			};			
			// 定时器
			timer = setInterval(autoFn, this.args.time);			
			// 鼠标移到dom时清定时器
			this.dom.hover(
				function() {
					clearInterval(timer);
				},
				function() {
					timer = setInterval(autoFn, that.args.time);					
				}
			);
		},
		setEffect: function(effect, index){
			switch(effect){
				// 默认效果
				case '':
					this.contChild.eq(index).show().siblings().hide();	
				break;
				// 渐变效果
				case 'fade':
					this.contChild.eq(index).stop(true, true).fadeIn(this.args.speed).siblings().hide();
				break;
				// 滑动效果
				case 'slide':
					this.contChild.show();
					var domW = this.dom.width();					
					this.dom.find(this.args.tabCont + ':first').css({
						'width': this.topChildLen * domW
					});					
					this.contChild.css({
						'width': domW,
						'float': 'left'
					});					
					this.dom.css({
						'overflow': 'hidden',
						'width': domW
					});
					this.dom.find(this.args.tabCont + ':first').stop(true, true).animate({marginLeft: -index * domW}, this.args.speed);
				break;
			}			
		}		
	};
	return Tab;
});
