/**
 * [addZero 补零]
 * @author Yc
 * @param {[type]} str [原字符串]
 * @param {[type]} n   [加零后的字符串长度]
 */
define(function(require, exports, module) {
	var addZero = function(str, n){
		var str = '' + str;
		while (str.length < n) {
			str = '0' + str;
		};
		return str;
	}
	module.exports = addZero;
});