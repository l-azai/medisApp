(function() {
    angular.module("medisApp")
        .animation('.slide-fade', function() {
            return {
                beforeAddClass: function(element, className, done) {
                    var height = element[0].offsetHeight;
                    element.css('position', 'relative');

                    if (className.indexOf('ng-hide') > -1) {
                        TweenMax.to(element, 0.5, { opacity: 0, 'margin-bottom': -height, top: -height, onComplete: done });
                    } else {
                        done();
                    }
                },
                removeClass: function(element, className, done) {
                    var height = element[0].offsetHeight;
                    element.css('position', 'relative');

                    if (className.indexOf('ng-hide') > -1) {
                        TweenMax.to(element, 0.5, { opacity: 1, 'margin-bottom': 0, top: 0, onComplete: done });
                    } else {
                        done();
                    }
                },
                enter: function(element, done) {
                    var height = element[0].offsetHeight;

                    TweenMax.from(element, 0.5, { opacity: 0, 'margin-bottom': -height, onComplete: done });
                },
                leave: function(element, done) {
                    var height = element[0].offsetHeight;

                    TweenMax.to(element, 0.5, { opacity: 0, 'margin-bottom': -height, onComplete: done });
                },
                addClass : function(element, className, done) { 
                    //debugger;
                    done(); 
                },
                beforeRemoveClass : function(element, className, done) { 
                    //debugger;
                    done(); 
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
