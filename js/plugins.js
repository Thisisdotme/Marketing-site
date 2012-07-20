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

// Username and Email Validation be Ken Lenga

var TIM = TIM || {};
TIM.baseApiUrl = "http://api.thisis.me/v1/";
var authornameCache = {};

$(document).ready(function() {
  var requestInProgress = false;
	var authornameAvailable = false;
	var emailValid = false;
  
  $("ul#ticker").removeClass("hidden"),
	window.scrollTo(0, 0);
	
	$('#firstinput').keyup(function(event) {
	  var authorname = $('#firstinput').val();

	  if(!validateAuthorname(authorname)) {
	    setAvailability(false);
	    return;
	  }
	  if(authornameCache["" + authorname]) {
      setAvailability(authornameCache["" + authorname].available);
      return;
	  }
	  if(!requestInProgress) {
	    requestInProgress = true;
	    $.ajax({
	      type: "get",
	      dataType: "text",
  	    url: TIM.baseApiUrl + "reservation/" + authorname,
  	    success: function(json, textStatus) {
  	      setAvailability(false);
  	      authornameCache["" + authorname] = {available: false};
        },
        error: function(xOptions, textStatus) {
          setAvailability(true); //only if not found
          authornameCache["" + authorname] = {available: true};
        },
      });
	  }
	  
	  function validateAuthorname(authorname) { 
      var re = /^[a-zA-Z0-9_]+$/;
      return re.test(authorname);
    }
	  
	  function setAvailability(available) {
	    if(available) {
	      authornameAvailable = true;
        $('#firstinput').addClass('valid').removeClass('not-valid');
	    } else {
	       $('#firstinput').addClass('not-valid').removeClass('valid');
         authornameAvailable = false;
	    }
	    requestInProgress  = false;
	  }

	  return false;
	  
	});
	
	
	$('#emailinput').keyup(function(event) {
	  var email = $('#emailinput').val();
	  if(email.length < 1) {
	    emailValid = false;
	    $('#email-valid').removeClass('yes')
	    return;
	  }
	  
	  function validateEmail(email) { 
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    
    if (validateEmail(email)) {
       $('#emailinput').addClass('valid').removeClass('not-valid');
       emailValid = true;
    } else {
      $('#emailinput').removeClass('valid').addClass('not-valid');
      emailValid = false;
    }
	  	  
	});
	
	$('#reserve-form').on('submit', function(event) {
    
    if(!authornameAvailable || !emailValid) {
      console.log(authornameAvailable, emailValid);
      return false;
    }
    
    var authorname = $('#firstinput').val();
	  var email = $('#emailinput').val();
    var emailJSON = {
      email: email
    }
    
	  if(!requestInProgress) {
	    requestInProgress = true;
	    $.ajax({
	      type: "put",
  	    url: TIM.baseApiUrl + "reservation/" + authorname,
  	    data: JSON.stringify(emailJSON),
  	    success: function(json, textStatus) {
  	      console.log(json, textStatus);
  	      alert("Congratulations!  We've received your request to reserve the name " + authorname); //$('#status-message').addClass('yes').html('Congratulations!  You reserved the name ' + authorname);
          
          requestInProgress  = false;
        },
        error: function(json, textStatus, err) {
          alert('This username/email combination is not available');
          requestInProgress  = false;
        }
      });
	  }

	  return false;
	  
	});
	
	
});