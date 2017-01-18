/**
 * 1. 先全局安装所需npm插件
 * 2. 在package.json文件里修改"scripts"值，link所有npm插件
 * 3. 连接npm插件: $ npm start (首次编译时连接)
 * 4. 启动gulp: $ gulp
 * 5. seajs编写插件规范：
 * 示例：
 * 在plugin_src目录新js文件test.js代码如下
 * define('base/js/plugin/test', function(require, exports, module) {
        var isSupportAttr = require('../components/is_support_attr');
        return isSupportAttr;
   });
   调用：
   seajs.use(['base/js/plugin/test'], function(Test) {
       Test('placeholder', 'input'); // true
   });
 */

'use strict';

var gulp = require('gulp');
var seajs = require('gulp-seajs-combine');
var uglify = require('gulp-uglify');


/**
 * seajs模块合并压缩
 */
gulp.task('seajscombine', function() {
    return gulp.src('./js/plugin_src/*.js')
        .pipe(seajs(null, {
            except: [
                'jquery'
            ]
        }))
        .pipe(uglify({
            mangle: {except: ['require', 'exports', 'module', '$']},
            compress: true
        }))
        .pipe(gulp.dest('./js/plugin/'));
}); 


/**
 * 实时监控
 */
gulp.task('watch', function() {
    gulp.watch('js/plugin_src/*.js', ['seajscombine']);
});

/**
 * 指定默认任务
 */
gulp.task('default', ['watch', 'seajscombine']);
