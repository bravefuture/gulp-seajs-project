/**
 * [isSupportAttr 判断标签是否支持某属性]
 * @author Yc
 * @param  {[type]} attr [属性]
 * @param  {[type]} tag  [标签]
 * @return {[type]}      [返回true或false]
 */
define(function(require, exports, module) {
	var isSupportAttr = function(attr, tag){
		var support = false;
		if(attr in document.createElement(tag)){
			support = true;
		}
		return support;
	}
	module.exports = isSupportAttr;
});