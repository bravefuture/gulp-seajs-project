/**
 * [dateTime 获取时间]
 * @author Yc
 */
define(function(require, exports, module) {
	var dateTime = function(){
		var date = new Date(),
			year = date.getFullYear(),
			month = date.getMonth(),
			day = date.getDate(),
			week = date.getDay(),
			hour = date.getHours(),			
			minute = date.getMinutes(),			
			second = date.getSeconds();		
		return {
			date: date,
			year: year,
			month: month,
			day: day,
			week: week,
			hour: hour,
			minute: minute,
			second: second
		};
	}
	module.exports = dateTime;
});