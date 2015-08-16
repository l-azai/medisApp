(function(){
    var mainCtrl = function($scope, $location) {

        $scope.activeNavClass = function(path) {
            return $location.path().indexOf(path) === 0
                ? 'active'
                : '';
        };

        $scope.closeTempMsg = function() {
            $scope.showTempMsg = false;
        };

        $scope.setTempMsg = function(msg) {
            $scope.tempMsg = msg;
            $scope.showTempMsg = true;
        };
    };

    angular.module("medisApp.ctrl")
        .controller("MainCtrl", ["$scope", "$location", mainCtrl]);
}());
