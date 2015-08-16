(function(){
    var formFieldSet = function () {
        return {
            scope: {
                disable: '='
            },
            controller: function($scope) {
                var setDisable = function(value) {
                    $scope.disabled = value ? true : undefined;
                };

                setDisable($scope.disable)

                $scope.$watch('disable', function(val) {
                    setDisable(val);
                });
            },
            transclude: true,
            template: '<fieldset ng-attr-disabled="{{ disabled }}"><div ng-transclude></div></fieldset>'
        };
    };

    angular.module("medisApp.directives")
        .directive("formFieldset", formFieldSet);
}());
