(function(){
    var formFieldSet = function () {
        return {
            link: function(scope, element, attrs) {
                var setDisable = function (val) {
                    scope.disabled = scope.disableForm ? true : undefined;
                };

                scope.$watch(attrs.disable, function(){
                    setDisable();
                });

                setDisable();
            },
            transclude: true,
            template: '<fieldset ng-attr-disabled="{{ disabled }}"><div ng-transclude></div></fieldset>'
        };
    };

    angular.module("medisApp.directives")
        .directive("formFieldset", formFieldSet);
}());
