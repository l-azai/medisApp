(function(){
    var mainCtrl = function($scope, $location) {

        $scope.activeNavClass = function(path) {
            return $location.path().indexOf(path) === 0
                ? 'active'
                : '';
        };
    };

    angular.module("medisApp.ctrl")
        .controller("MainCtrl", ["$scope", "$location", mainCtrl]);
}());
