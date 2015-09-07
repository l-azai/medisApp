(function () {
    var swAccord = function () {
        return {
            restrict: 'E',
            controller: function () {
                var accordGroups = [];

                this.getAccordions = function () {
                    return accordGroups;
                };

                this.registerAccordGroup = function (accord) {
                    accordGroups.push(accord);

                    if (accordGroups.length == 1) {
                        accord.selected = true;
                    }
                };

                this.switchAccord = function (index) {
                    angular.forEach(accordGroups, function (itm, idx) {
                        if (idx == index) {
                            itm.selected = true;
                        } else {
                            itm.selected = false;
                        }
                    });
                };
            },
            link: function (scope, element, attrs, ctrl) {

                scope.swAccordion = ctrl;
            }
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
                        accordCtrl.switchAccord(idx);
                    });
                });

                accordCtrl.registerAccordGroup(scope);
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