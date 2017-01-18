/**
 * [daysInMonth 某年的某月有多少天]
 * @author Yc
 * @param {[type]} year [年]
 * @param {[type]} month   [月]
 */
define(function(require, exports, module) {
	var daysInMonth = function(year, month){
		month = parseInt(month, 10) + 1;
		return new Date(year, month, 0).getDate();
	}
	module.exports = daysInMonth;
});