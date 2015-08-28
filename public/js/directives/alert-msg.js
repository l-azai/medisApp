(function() {
    var alertDirective = function() {

        var alertCtrl = ["$scope", function($scope) {
            $scope.$watch('type', function(value) {
                setTempMsg(value);
            });

            var setTempMsg = function(type) {
                var alertHeading, glyph;

                switch (type) {
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
            };
        }];

        return {
            restrict: 'E',
            transclude: true,
            scope: {
                type: '=',
                closeTempMsg: '&',
                visible: '='
            },
            controller: alertCtrl,
            templateUrl: '/partials/shared/alert-msg.html'
        };
    };

    // obsolete
    //angular.module("medisApp.directives")
    //    .directive("alertMsg", alertDirective);
}());
