(function () {
    var jqAccordion = function () {
        return {
            restrict: 'A',
            scope: {
                jqAccordion: '=',
                options: '='
            },
            link: function (scope, element, attrs) {
                $(element[0]).accordion(scope.options || {});

                var jqInstance = $(element[0]).accordion('instance');

                var jqInherited = {
                    ngSetActive: function (idx) {
                        jqInstance.option('active', parseInt(idx));
                    }
                };

                angular.extend(jqInherited, jqInstance);

                scope.jqAccordion = jqInherited;
            }
        };
    };

    angular.module('medisApp.directives')
        .directive('jqAccordion', jqAccordion);
}());