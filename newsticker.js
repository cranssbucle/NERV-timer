
(function($) {
	$.fn.newsticker = function(opts) {
		// default configuration
		var config = $.extend({}, {
            height: 30,
            speed: 800,
            start: 8
        }, opts);
		// main function
		function init(obj) {
            var dNewsticker = obj;
            var dFrame = dNewsticker.find('.js-frame');
            var dItem = dFrame.find('.js-item');
            var dNext;
            var stop = false;
            
            dItem.eq(0).addClass('current');
            
            var moveUp = setInterval(function(){
                if(!stop){
                    var dCurrent = dFrame.find('.current');
                    
                    dFrame.animate({top: '-=' + config.height + 'px'}, config.speed, function(){        
                        dNext = dFrame.find('.current').next();
                        dNext.addClass('current');
                        dCurrent.removeClass('current');
                        dCurrent.clone().appendTo(dFrame);
                        dCurrent.remove();
                        dFrame.css('top', config.start + 'px');
                    }); 
                }
            },3000);
          
            dNewsticker.on('mouseover mouseout', function(e){
                var dThisWrapper = $(this);
				if(e.type == 'mouseover') {
					stop = true;
				} 
				else{// mouseout
					stop = false;
				}
            });
        }
		// initialize every element
		this.each(function() {
			init($(this));
		});
		return this;
	};
	// start
	$(function() {
		$('.js-newsticker').newsticker();
	});
})(jQuery);