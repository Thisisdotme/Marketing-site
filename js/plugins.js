// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());


// place any jQuery/helper plugins in here, instead of separate, slower script files.
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

$(document).ready(function(){
        $('#ticker').list_ticker({
                speed:4000,
		    effect:'fade'
		    })              
	    });
/* List Ticker by Alex Fish 
// www.alexefish.com
//
// options:
//
// effect: fade/slide
// speed: milliseconds
*/

(function($){
    $.fn.list_ticker = function(options){
    
	var defaults = {
	    speed:4000,
	    effect:'slide'
	};
    
	var options = $.extend(defaults, options);
    
	return this.each(function(){
      
		var obj = $(this);
		var list = obj.children();
		list.not(':first').hide();
      
		setInterval(function(){
        
			list = obj.children();
			list.not(':first').hide();
        
			var first_li = list.eq(0)
			    var second_li = list.eq(1)
			    
			    if(options.effect == 'slide'){
				first_li.slideUp();
				second_li.slideDown(function(){
					first_li.remove().appendTo(obj);
				    });
			    } else if(options.effect == 'fade'){
				first_li.fadeOut(function(){
					second_li.fadeIn();
					first_li.remove().appendTo(obj);
				    });
			    }
		    }, options.speed)
		    });
    };
})(jQuery);


