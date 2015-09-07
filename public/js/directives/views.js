(function () {
    var viewsDir = function () {
        return {
            restrict: 'E',
            controller: function () {
                var views = {};

                this.registerView = function (ctrl) {
                    views[ctrl.name] = ctrl;
                }

                this.switchView = function (viewName) {
                    angular.forEach(views, function (ctrl, index) {
                        if (ctrl.name == viewName) {
                            ctrl.show();
                        } else {
                            ctrl.hide();
                        }
                    });
                }
            },
            link: function (scope, element, attrs, viewsCtrl) {
                element.on('click', '[view-target]', function () {
                    var viewName = angular.element(this).attr('view-target');
                    viewsCtrl.switchView(viewName);
                });

                scope.views = viewsCtrl;
            }
        };
    };

    var viewDir = function () {
        return {
            restrict: 'E',
            require: ['view', '^views'],
            controller: function ($element, $attrs) {
                this.name = $attrs.name;

                this.show = function () {
                    $element.show();
                };
                this.hide = function () {
                    $element.hide();
                };
            },
            link: function (scope, element, attrs, ctrls) {
                var viewCtrl = ctrls[0];
                var viewsCtrl = ctrls[1];

                viewsCtrl.registerView(viewCtrl);

                if (attrs.initial !== undefined) {
                    viewCtrl.show();
                } else {
                    viewCtrl.hide();
                }
            }
        };
    };

    angular.module('medisApp.directives')
        .directive('views', viewsDir)
        .directive('view', viewDir);
}());