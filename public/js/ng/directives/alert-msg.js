(function(){
    var alertDirective = function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                type: '@',
                closeMsg: '&',
                alertTxt: '='
            },
            controller: ["$scope", function($scope) {
                var alertTitle;

                switch(angular.lowercase($scope.type)) {
                    case 'success':
                        alertTitle = 'Success';
                    break;
                    case 'danger':
                        alertTitle = 'Error';
                    break;
                    case 'warning':
                        alertTitle = 'Warning';
                    break;
                    case 'info':
                        alertTitle = 'Info';
                    break;
                }

                $scope.alertTitle = alertTitle;
            }],
            template: '<alert type="{{type}}" close="closeMsg()" ng-show="alertTxt"><strong>{{ alertTitle }}:</strong> <span ng-transclude></span></alert>'
        };
    };

    angular.module("medisApp.directives")
        .directive("alertMsg", alertDirective);
}());
