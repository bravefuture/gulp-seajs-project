define("",[],function(require,exports,module){var i=function(i,t){this.$el=i instanceof $?i:$(i),this.args=$.extend({clickHover:null,additionalH:0,time:100,fadeInTime:500},t||{}),this.$clickHover=this.args.clickHover instanceof $?this.args.clickHover:$(this.args.clickHover),this.listImg=[],this.listHideImg=[],this.wind=$(window),this.docH=$(document).height(),this.saveImageData(),this.scrollResize()};return i.prototype={saveImageData:function(){var i=this;this.$el.each(function(t,e){var s=$(e);"undefined"!==s.data("lazy")&&(s.is(":visible")?i.listImg.push({dom:s,top:s.offset().top}):i.listHideImg.push({dom:s}))})},showImage:function(i){var t=this;$.each(this.listHideImg,function(i,e){e&&e.dom.is(":visible")&&(t.listImg.push({dom:e.dom,top:e.dom.offset().top}),delete t.listHideImg[i])}),$.each(this.listImg,function(e,s){if(s&&s.top<i){var a=new Image;a.onload=function(){"img"!==s.dom.get(0).tagName.toLowerCase()?s.dom.css({backgroundImage:"url("+s.dom.data("lazy")+")"}).hide().fadeIn(t.args.fadeInTime):s.dom.attr("src",s.dom.data("lazy")).hide().fadeIn(t.args.fadeInTime)},a.src=s.dom.data("lazy"),delete t.listImg[e]}})},changeArea:function(){var i=$(document).height()-this.docH;this.showImage(this.wind.scrollTop()+this.wind.height()+this.args.additionalH-i)},scrollResize:function(){var i=this,t=null;this.changeArea(),this.$clickHover.each(function(t,e){var s=$(e);s.on("click.lazy mouseover.lazy",function(){setTimeout(function(){i.changeArea()},100)})}),this.wind.on("scroll.lazy resize.lazy",function(){return void 0===i.listHideImg[i.listHideImg.length-1]&&void 0===i.listImg[i.listImg.length-1]?void i.wind.off("scroll.lazy resize.lazy"):(t&&clearTimeout(t),void(t=setTimeout(function(){i.changeArea()},i.args.time)))})}},i});