(function () {
    var swAccord = function () {
        return {
            restrict: 'E',
            scope: {
                instance: '=',
                // this is actually a function, but the reason '&' is not being used is because
                // checking is required to see if the attribute has been defined with a function.
                // passing '&' automatically assumes its a function using 'typeof' even when no function has been
                // passed to the attribute. Passing '=' allows me to check if it has been defined and whether its a 
                // function, then proceed to call it.
                // This will also only work if the function passed is not immediately invoked. e.g. fn().
                //beforeActivate: '=',
                //activate: '='
                options: '='
            },
            controller: ['$scope', '$parse', function ($scope, $parse) {
                var accordGroups = [];

                // On before-activate attribute, set function with call e.g. testAlert()
                // $parse($attrs.beforeActivate)($scope) or $scope.$eval($attrs.beforeActivate) 
                // to call function also

                // Instead passing function name without call e.g. testAlert
                // $parse($attrs.beforeActivate)($scope) or $scope.$eval($attrs.beforeActivate) 
                // gets function name without calling, can check typeof function to validate to make sure,
                // instead of blindly calling it

                this.getAccordions = function () {
                    return accordGroups;
                };

                this.registerAccordion = function (accord) {
                    accordGroups.push(accord);

                    if (accordGroups.length == 1) {
                        accord.selected = true;
                    }
                };

                this.switch = function (index) {
                    angular.forEach(accordGroups, function (itm, idx) {
                        if (idx == index) {
                            itm.selected = true;
                        } else {
                            itm.selected = false;
                        }
                    });
                };

                // pass accordion controls to parent instance
                if ($scope.instance !== undefined) {
                    $scope.instance.accordion = this;
                }
            }]
        };
    };

    var swAccordGroup = function () {
        return {
            restrict: 'E',
            require: '^swAccord',
            transclude: true,
            scope: {
                heading: '@'
            },
            controller: function () {

            },
            link: function (scope, element, attrs, ctrls) {
                var accordCtrl = ctrls;
                var idx = accordCtrl.getAccordions().length;

                element.attr('data-idx', idx);

                element.find('.panel-heading').on('click', function (e) {
                    scope.$apply(function () {
                        accordCtrl.switch(idx);
                    });
                });

                accordCtrl.registerAccordion(scope);
            },
            template:   '<div class="panel panel-default">' +
                            '<div class="panel-heading">{{ heading }}</div>' +
                            '<div class="panel-body" ng-show="selected" ng-transclude></div>' +
                        '</div>'
        };
    };


    angular.module('medisApp.directives')
        .directive('swAccord', swAccord)
        .directive('swAccordGroup', swAccordGroup);
}());