(function() {
    angular.module("medisApp")
        .animation('.slide-anim', function() {
            return {
                beforeAddClass: function(element, className, done) {
                    if (className == 'ng-hide') {
                        // explicit set of width 100% otherwise it loses its width
                        //jQuery(element).css({ width: '100%' }).slideUp(500, done);
                        jQuery(element).hide();
                        done();
                    } else {
                        done();
                    }
                },
                removeClass: function(element, className, done) {
                    if (className == 'ng-hide') {
                        //element.css('opacity', 0);
                        jQuery(element).slideDown(500, done);
                    } else {
                        done();
                    }
                }

                /* animation even template */
                // enter : function(element, done) {
                //   jQuery(element).css({
                //     color:'#FF0000'
                //   });
                //
                //   //node the done method here as the 2nd param
                //   jQuery(element).animate({
                //     color:'#0000FF'
                //   }, done);
                //
                //   return function(cancelled) {
                //     /* this (optional) function is called when the animation is complete
                //        or when the animation has been cancelled (which is when
                //        another animation is started on the same element while the
                //        current animation is still in progress). */
                //     if(cancelled) {
                //       jQuery(element).stop();
                //     }
                //   }
                // },
                //
                // leave : function(element, done) { done(); },
                // move : function(element, done) { done(); },
                //
                // beforeAddClass : function(element, className, done) { done(); },
                // addClass : function(element, className, done) { done(); },
                //
                // beforeRemoveClass : function(element, className, done) { done(); },
                // removeClass : function(element, className, done) { done(); },
                //
                // allowCancel : function(element, event, className) {}
            };
        });
}());
