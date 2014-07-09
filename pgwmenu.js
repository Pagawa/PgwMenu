/**
 * PgwMenu - Version 1.0
 *
 * Copyright 2014, Jonathan M. Piat
 * http://pgwjs.com - http://pagawa.com
 * 
 * Released under the GNU GPLv3 license - http://opensource.org/licenses/gpl-3.0
 */
;(function($){
    $.fn.pgwMenu = function(options) {
    
        var defaults = {
            dropDownLabel : 'Menu'
        };
    
        if (this.length == 0) {
            return this;
        } else if(this.length > 1) {
            this.each(function() {
                $(this).pgwMenu(options);
            });
            return this;
        }

        var pgwMenu = this;
        pgwMenu.plugin = this;
        pgwMenu.config = {};
        
        // Init function
        var init = function() {
        
            // Merge user options with default configuration
            pgwMenu.config = $.extend({}, defaults, options);

            // Setup
            createDropDown();
            pgwMenu.checkMenu();

            // Triggers
            $(window).resize(function() {
                pgwMenu.checkMenu();
            });

            pgwMenu.plugin.find('.pmDropDown').click(function(e) {
                pgwMenu.enableDropDown();
                e.stopPropagation();
            });
            
            $(document).click(function() {
                pgwMenu.disableDropDown();
            });
        };
        
        // Create drop down
        var createDropDown = function() {
            pgwMenu.plugin.removeClass();
            pgwMenu.plugin.wrap('<div class="pgwMenu"></div>');
            pgwMenu.plugin = pgwMenu.plugin.parent();
            pgwMenu.plugin.prepend('<div class="pmDropDown"><a href="javascript:void(0)">' + pgwMenu.config.dropDownLabel + '</a></div>');
        };

        // Check menu
        pgwMenu.checkMenu = function() {
            var menuMaxWidth = pgwMenu.plugin.width();

            function getContentWidth() {
                var menuContentWidth = 0;
                pgwMenu.plugin.find('ul').removeClass('mobile').show();
                pgwMenu.plugin.find('ul li').each(function() {
                    menuContentWidth += $(this).width();
                });
                return menuContentWidth;
            }

            function switchMenu(type) {
                if (type == 'dropdown') {
                    pgwMenu.plugin.find('ul').addClass('mobile').hide();
                    pgwMenu.plugin.find('.pmDropDown').show();
                } else {
                    pgwMenu.plugin.find('ul').removeClass('mobile').show();
                    pgwMenu.plugin.find('.pmDropDown').hide();
                }
                pgwMenu.plugin.find('.pmDropDown a').removeClass('active');
            }

            if (getContentWidth() > menuMaxWidth) {
                switchMenu('dropdown');
            } else {
                switchMenu('normal');
            }
        };       

        // Enable drop down
        pgwMenu.enableDropDown = function() {
            if (pgwMenu.plugin.find('.pmDropDown a').hasClass('active')) {
                pgwMenu.disableDropDown();
                return false;
            }

            pgwMenu.plugin.find('.pmDropDown a').addClass('active');
            pgwMenu.plugin.find('ul').show();
        };

        // Disable drop down
        pgwMenu.disableDropDown = function() {
            if (pgwMenu.plugin.find('.pmDropDown a').hasClass('active')) {
                pgwMenu.plugin.find('.pmDropDown a').removeClass('active');
                pgwMenu.plugin.find('ul').hide();
            }
        };
        
        // Menu initialization
        init();
        
        return this;
    }
})(window.Zepto || window.jQuery);
