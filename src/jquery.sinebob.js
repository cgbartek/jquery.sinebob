/*!
 * Plugin: jQuery.SineBob
 * Version: 1.0
 * Author: Chris Bartek
 * Examples and documentation: http://chrisbartek.com
 * Copyright (c) 2012 Chris Bartek
 * Dual licensed under the MIT and GPL licenses
 * Dependencies: jQuery
 */

(function ($) {

    $.fn.sinebob = function (options) {

        var defaultVal = {
			mode: "bob",
			direction: "top",
            offset: 30,
			s_offset: 10,
            length: 30,
			s_length: 1,
            interval: 10,
			start: 0,
			increment: 0.05,
			ticks: 0,
			speed: 10
        };

        var obj = $.extend(defaultVal, options);

        return this.each(function () {
            var selObj = $(this);
			selObj.ticks = 0;
			
			// MODE: DEFAULT/BOB
			if(obj.mode == 'bob'){
				if(selObj.css('position') == 'static'){
					selObj.css('position','relative');
				}
				var start = obj.start;
				function sine(){
					selObj.css(obj.direction, obj.length * Math.sin(start) + obj.offset);
					start += obj.increment;
					selObj.ticks++;
					if(selObj.ticks == obj.ticks) {
						clearInterval(intr);
					}
				}
				var intr = setInterval(sine, obj.interval);
			}
			
			// MODE: SIMPLE
			if(obj.mode == 'simple') {
				if(selObj.css('position') == 'static'){
					selObj.css('position','relative');
				}
				function sineBobSimple(){
					if(obj.direction == 'left'){
						selObj.animate({"left": "+="+obj.length+"px"}, obj.interval*100).animate({"left": "-="+obj.length+"px"}, obj.interval*100);
					} else {
						selObj.animate({"top": "+="+obj.length+"px"}, obj.interval*100).animate({"top": "-="+obj.length+"px"}, obj.interval*100);
					}
					selObj.ticks++;
					if(selObj.ticks != obj.ticks) {
						sineBobSimple();
					}
				}
				sineBobSimple();
			}
			
			// MODE: FADE
			if(obj.mode == 'fade') {
				var start = obj.start;
				function sineFade(){
					selObj.css('opacity', (obj.length * Math.sin(start) + obj.offset) / 100);
					start += obj.increment;
				}
				var intr = setInterval(sineFade, obj.interval);
			}
			
			// MODE: ROTATE/SCALE/ROTOSCALE
			if(obj.mode == 'rotate' || obj.mode == 'scale' || obj.mode == 'rotoscale') {
				if(selObj.css('position') == 'static'){
					selObj.css('position','relative');
				}
				var start = obj.start,
					degrees = 0,
					scale = 1;
				function sineRotate(){
					if(obj.mode == 'rotate' || obj.mode == 'rotoscale'){
						degrees = obj.length * Math.sin(start) + obj.offset;
					}
					if(obj.mode == 'scale'){
						scale = (obj.length * Math.sin(start) + obj.offset) / 10;
					}
					if(obj.mode == 'rotoscale'){
						scale = (obj.s_length * Math.sin(start) + obj.s_offset) / 10;
					}
					var css = 'rotate('+degrees+'deg) scale('+scale+','+scale+')';
					selObj.css({
					  "-webkit-transform" : css,
						 "-moz-transform" : css,
						  "-ms-transform" : css,
						   "-o-transform" : css,
							  "transform" : css
					});
					start += obj.increment;
				}
				var intr = setInterval(sineRotate, obj.interval);
			}
			
			// MODE: TEXT
			if(obj.mode == 'text') {
				selObj.css('overflow','hidden');
				selObj.css('white-space','nowrap');
				var start = obj.start;
				var movement = selObj.width();
				
				function textWidth(target){
					var html_org = target.html();
					var html_calc = '<span>' + html_org + '</span>';
					target.html(html_calc);
					var width = target.find('span:first').width();
					target.html(html_org);
					return width;
				};
				var widthCalc = textWidth(selObj);
				
				var newtarget = $('<div></div>');
				var newhtml = '<div class="innerText" style="position:relative;display:inline-block;white-space:normal;">';
				selObj.contents().clone().each(function() {
					if (this.nodeType == 3) {
						var text = this.wholeText; // or textContent
						for (var i = 0; i < text.length; i++) {
							if (text[i] == ' ') newhtml += '<div style="float:left;visibility:hidden;">' + '_' + '</div>';
							else newhtml += '<div style="float:left;position:relative;">' + text[i] + '</div>';
						}
						newtarget.append($(newhtml));
					}
					else {
						$(this).html(wrap($(this)));
						newtarget.append($(this));
					}
				});
				newhtml = '</div>';
				selObj.html( newtarget.html());
				selObj.children().css('width',widthCalc+(widthCalc/8));
				
				function textSine(){
					selObj.children().children().each(function(index) {
						start += obj.increment;
						$(this).css(obj.direction, obj.length * Math.sin(start) + obj.offset);
					});
					movement += obj.speed*(-1);
					selObj.children().css('left',movement);
					if(parseInt(selObj.children().css('left')) <= selObj.children().width()*(-1)) {
						movement = selObj.width();
					}
				}
				var intr = setInterval(textSine, obj.interval);
			}
        });
    }
	
	$.fn.sinebobabout = function () {
		alert('jQuery.SineBob v1.0\n\nby Chris Bartek');
	}
})(jQuery);