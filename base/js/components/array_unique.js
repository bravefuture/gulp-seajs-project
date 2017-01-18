/**
 * [arrayUnique 数组去重]
 * @author Yc
 * @param {[type]} array [原数组]
 */
define(function(require, exports, module) {
	var arrayUnique = function(array){
		if(array.constructor === Array){
			var newArray = [],
				obj = {},
				arrayLen = array.length;
			for(var i = 0; i < arrayLen; i++){
				if(!obj[array[i]]){
					newArray.push(array[i]);
					obj[array[i]] = 1;
				}
			}
			return newArray;
		}
	}
	module.exports = arrayUnique;
});