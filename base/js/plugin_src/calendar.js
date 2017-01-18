/**
 * [Calendar 2.0 日历插件]
 * @author Yc
 * @created 2016.11.14
 * @update  2016.12.07
 * @param {[type]} selector [description]
 * @param {[type]} args     [description]
 */
define('base/js/plugin/calendar', function(require, exports, module) {
	// 引用模块
	var addZero = require('../components/add_zero'),
		daysInMonth = require('../components/days_in_month'),
		dateTime = require('../components/date_time');
		
	var Calendar = function(selector, args){
		// 获取dom
		this.dom = selector instanceof $ ? selector : $(selector);		
		// 设置参数
		this.args = $.extend({
			prevMonth: '上月',
			nextMonth: '下月',
			prevYear: '上年',
			nextYear: '下年',
			weekData: ['日', '一', '二', '三', '四', '五', '六'],
			selectedData: [],
			selectCurrentMonth: true,
			showOn: false,
			separation: '-',
			ableDay: [],
			callback: function(){},
			show: false,
			isClick: true,
			insert: false,
			chooseYear: true
		}, args || {});	

		this.init();
	};
	Calendar.prototype = {
		// 执行
		init: function() {
			var that = this,		
				year = dateTime().year,
				month = dateTime().month,
				day = dateTime().day,
			// 是否已生成日历结构
				isBuilded = false;		
			this.dom.on('click', function(e){
				e.stopPropagation();
				if(isBuilded === false){
					that.createCalendar(year, month, day);
					isBuilded = true;
				}
				that.showCalendar();					
			});	
			// 直接显示日历
			if (this.args.show === true) {
				this.dom.trigger('click');
			}
		},
		// 生成日期
		buildDate: function(year, month, day) {
			if (month === 0) {
				month = 12;
				year -= 1;
			}
			if (month === 13) {
				month = 1;
				year += 1;			
			}
			return year + this.args.separation + addZero(month, 2) + this.args.separation + addZero(day, 2);
		},
		// 生成日历结构
		createCalendar: function (year, month, day){
			var that = this,
				calWrap = $('<div class="calendar-wrap"></div>'),
				calWrapInner = $('<div class="calendar-wrap-inner"></div>'),
				calTitle = $('<div class="calendar-title"><a href="javascript:void(0)" class="calendar-prev-btn">' + this.args.prevMonth + '</a><a href="javascript:void(0)" class="calendar-next-btn">' + this.args.nextMonth + '</a></div>'),
				calTitleYear = $('<div class="calendar-title"><a href="javascript:void(0)" class="calendar-prev-btn calendar-prev-btn-y">' + this.args.prevYear + '</a><a href="javascript:void(0)" class="calendar-next-btn calendar-next-btn-y">' + this.args.nextYear + '</a></div>'),
				calTable = $('<table width="100%"></table>'),
				calThead = $('<thead><tr></tr></thead>'),
				calTbody = $('<tbody></tbody>');

			// calThead插入星期
			$.each(this.args.weekData, function(k, v){
				var th = $('<th></th>');
				if(k == 0 || k == 6){
					th.addClass('red');
				}
				th.html(v);
				calThead.find('tr').append(th);
			});		

			// calTitle插入年月
			calTitle.append('<span class="calendar-choose-year">' + year + '</span>' + '年' + '<span class="calendar-choose-month">' + (month + 1) + '</span>' + '月');		

			// calTbody插入日期
			for(var i = 0; i < 6; i++){
				var tr = $('<tr></tr>');
				for(var j = 0; j < 7; j++){
					var td = $('<td><span></span></td>');
					if(j == 0){
						td.addClass('nobl');
					}
					tr.append(td);
				}
				calTbody.append(tr);
			}

			// 重构、插入
			calWrapInner.append(calTitle);
			if (this.args.chooseYear === true) {
				calWrapInner.append(calTitleYear);
			}
			calTable.append(calThead);
			calTable.append(calTbody);
			calWrapInner.append(calTable);
			calWrap.append(calWrapInner);

			if (this.args.insert === true) {
				that.dom.html(calWrap);
			} else {
				calWrap.css({
					position: 'relative'
				});
				calWrapInner.css({
					position: 'absolute',
					left: 0
				});
				calWrap.insertAfter(that.dom);
			}

			this.calWrap = calWrap;

			this.changeDate(year, month, day);

			// 下一月
			calTitle.find('.calendar-next-btn').on('click', function(e){
				e.stopPropagation();
				month++;
				if(month == 12){
					month = 0;
					year = year + 1;
				}
				that.changeDate(year, month, day);
			});			
			// 上一月
			calTitle.find('.calendar-prev-btn').on('click', function(e){
				e.stopPropagation();
				month--;
				if(month == -1){
					month = 11;
					year = year - 1;
				}
				that.changeDate(year, month, day);
			});	
			// 下一年
			calTitleYear.find('.calendar-next-btn-y').on('click', function(e){
				e.stopPropagation();
				year++;
				that.changeDate(year, month, day);
			});	
			// 上一年
			calTitleYear.find('.calendar-prev-btn-y').on('click', function(e){
				e.stopPropagation();
				year--;
				that.changeDate(year, month, day);
			});
			
			if (this.args.isClick === true) {
				// 选择日期
				calTbody.on('click', 'td', function(){
					that.dom.val($(this).attr('date'));				
					that.hideCalendar();
					that.args.callback($(this).attr('date'));
				});	
				// 点击其它位置隐藏日历
				$(document).on('click.Calendar', function(){
					that.hideCalendar();
				});
				calWrap.on('click', function(e){
					e.stopPropagation();	
				});			
			}	
		},
		// 选中数据
		selectedDate: function(dom) {
			var selectedDataLen = this.args.selectedData.length,
				date = dom.attr('date').split(this.args.separation).join('-'),
				cMonth = addZero($('.calendar-choose-month').attr('month'), 2);
			for (var i = 0; i < selectedDataLen; i++) {
				// 只在当月显示选中数据
				if (this.args.selectCurrentMonth === true) {
					if (this.args.selectedData[i] === date && this.args.selectedData[i].split('-')[1] === cMonth) {
						dom.addClass('selected');
					}
				} else {
					if (this.args.selectedData[i] === date) {
						dom.addClass('selected');
					}					
				}
			}
		},
		// 选择日期
		changeDate: function(year, month, day){
			var that = this;			
			/*取当前月的1日对应的星期及显示日期*/
			var sDate = new Date();
			sDate.setFullYear(year);
			sDate.setMonth(month);
			sDate.setDate(1);
			
			var nowDate = new Date();
			var nowYear = nowDate.getFullYear();
			var nowMonth = nowDate.getMonth();

			this.calWrap.find('.calendar-choose-year').html(year).attr('year', year);
			this.calWrap.find('.calendar-choose-month').html(month + 1).attr('month', month + 1);
			
			var td = this.calWrap.find('td');
			var tdInnerHTML = function(n){
				var wDay = 0,
				// 当月天数
					days = daysInMonth(year, month),
				// 上个月天数
					prevMonthDays = daysInMonth(year, month - 1),
					prevWDay = n,
				// 下个月天数
					nextMonthDays = daysInMonth(year, month + 1),
					nextWDay = 0;

				td.each(function(k){
					var _this = $(this);
					_this.removeClass('current-month-time');
					_this.removeClass('selected');
					// 显示上个月天数
					if (k <= n - 1) {
						prevWDay--;					
						_this.find('span').html(prevMonthDays - prevWDay);
						_this.attr('date', that.buildDate(year, month, prevMonthDays - prevWDay));
						_this.attr('title', that.buildDate(year, month, prevMonthDays - prevWDay));
					// 显示下个月天数
					} else if (k > days + n -1) {
						nextWDay++;				
						_this.find('span').html(nextWDay);
						_this.attr('date', that.buildDate(year, month + 2, nextWDay));
						_this.attr('title', that.buildDate(year, month + 2, nextWDay));
					// 显示当月天数
					} else {
						wDay++;	
						_this.addClass('current-month-time');			
						_this.find('span').html(wDay);
						_this.attr('date', that.buildDate(year, month + 1, wDay));
						_this.attr('title', that.buildDate(year, month + 1, wDay));
						// 选中当天日期
						if(day === wDay && nowYear === year && nowMonth === month && that.args.showOn === true){
							_this.addClass('on');
						}
					}
					// 数据选中
					that.selectedDate(_this);
				});
			};		
			tdInnerHTML(sDate.getDay());		
		},
		// 隐藏日历
		hideCalendar: function(){
			this.calWrap.fadeOut();
		},
		// 显示日历
		showCalendar: function(){
			this.calWrap.fadeIn();
		}	
	};
	module.exports = Calendar;
});
