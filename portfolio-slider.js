(function ($) {
    
    $.fn.portfolioSlider = function(pages, options) {
        
    	var settings = $.extend({
    		autoplay: false,
    		interval: 3000,
    		lbtn: '&larr;',
    		rbtn: '&rarr;',
            width: 960,
    	}, options);

        this.addClass('jQuerySlider');
        var tmp = $('<div/>').attr('id', 'main-wrapper');
            this.append(tmp);
        var $mwrapper = this.find('#main-wrapper'),
            tmp = $('<div/>').attr('id', 'wrapper');
            $mwrapper.append(tmp);
        var $wrapper = this.find('#wrapper');

        for (var i = 0; i < pages.length; i++) {
            var page = $('<div/>').addClass('page').append($('<div/>').addClass('link').html($('<a/>').attr('href', pages[i].link).html(pages[i].link).attr('target', '_blank')))
                       .append($('<div/>').addClass('desc').html(pages[i].desc))
                       .append($('<img/>').attr('src', pages[i].src));
            $wrapper.append(page);
        };

        // View hacks
        $wrapper.width($wrapper.find('.page').length*settings.width+'px');

    	$mwrapper.append($('<div/>').addClass('navBtn left').html(settings.lbtn));
    	$mwrapper.append($('<div/>').addClass('navBtn right').html(settings.rbtn));

        // Slider navigation
        var wi = 1;

        this.find('.navBtn.left').click(prevPage);
        this.find('.navBtn.right').click(nextPage);

        function nextPage() {
            wi++; if(wi>$wrapper.find('.page').length) wi = 1;

            $wrapper.stop(true, true).animate({marginLeft: -960*(wi-1)}, 600, 'easeInOutBack');
        };

        function prevPage() {
            wi--; if(wi<1) wi = $wrapper.find('.page').length;

            $wrapper.stop(true, true).animate({marginLeft: -960*(wi-1)}, 600, 'easeInOutBack');
        };

        window.onkeyup = function(e) {
            var key = e.keyCode ? e.keyCode : e.which;

            if (key == 37) prevPage();
            if (key == 39) nextPage();
        }

        if(settings.autoplay) setInterval(nextPage, settings.interval);

        return this;
    };
 
}(jQuery));