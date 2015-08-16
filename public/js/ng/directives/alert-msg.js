(function() {
    var alertDirective = function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                type: '@',
                closeTempMsg: '&'
            },
            controller: ["$scope", function($scope) {
                // TODO: possibly change how type is passed. Instead of explicitly setting on html,
                // can make controller pass an object with the type and msg. $watch for the object and
                // dynamically set type and set message.
                var alertHeading;
                var glyph;

                switch(angular.lowercase($scope.type)) {
                    case 'success':
                        alertHeading = 'Success';
                        glyph = 'ok-sign';
                    break;
                    case 'danger':
                        alertHeading = 'Error';
                        glyph = 'remove-sign';
                    break;
                    case 'warning':
                        alertHeading = 'Warning';
                        glyph = 'exclamation-sign';
                    break;
                    case 'info':
                        alertHeading = 'Info';
                        glyph = 'info-sign';
                    break;
                }

                $scope.alertHeading = alertHeading;
                $scope.glyph = glyph;
            }],
            templateUrl: '/partials/shared/alert-msg.html'
        };
    };

    angular.module("medisApp.directives")
        .directive("alertMsg", alertDirective);
}());
