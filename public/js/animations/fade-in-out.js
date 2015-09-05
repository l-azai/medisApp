(function() {
    angular.module("medisApp")
        .animation('.fade-in-out', function() {
            return {
                enter: function (element, done) {
                    var height = element[0].offsetHeight;
                    element.css('position', 'relative');

                    TweenMax.from(element, 0.5, { opacity: 0, height: 0, onComplete: done });
                },
                leave: function (element, done) {
                    var height = element[0].offsetHeight;
                    element.css('position', 'relative');

                    TweenMax.to(element, 0.5, { opacity: 0, height: 0, onComplete: done });
                },
                move: function (element, done) {
                    TweenMax.fromTo(element, 0.5, { opacity: 0.5 }, { opacity: 1, onComplete: done });
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
