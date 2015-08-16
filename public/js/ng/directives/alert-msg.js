(function() {
    var alertDirective = function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                type: '@',
                closeMsg: '&'
            },
            controller: ["$scope", function($scope) {
                // TODO: possibly change how type is passed. Instead of explicitly setting on html,
                // can make controller pass an object with the type and msg. $watch for the object and
                // dynamically set type and set message.
                var alertTitle;
                var glyph;

                switch(angular.lowercase($scope.type)) {
                    case 'success':
                        alertTitle = 'Success';
                        glyph = 'ok-sign';
                    break;
                    case 'danger':
                        alertTitle = 'Error';
                        glyph = 'remove-sign';
                    break;
                    case 'warning':
                        alertTitle = 'Warning';
                        glyph = 'exclamation-sign';
                    break;
                    case 'info':
                        alertTitle = 'Info';
                        glyph = 'info-sign';
                    break;
                }

                $scope.alertTitle = alertTitle;
                $scope.glyph = glyph;
            }],
            templateUrl: '/partials/shared/alert-msg.html'
        };
    };

    angular.module("medisApp.directives")
        .directive("alertMsg", alertDirective);
}());
