(function(){
    var mainCtrl = function($scope, $location) {

        $scope.activeNavClass = function(path) {
            return $location.path().indexOf(path) === 0
                ? 'active'
                : '';
        };


        /* Messages */
        $scope.setSuccessMsg = function(msg) {
            $scope.alertType = 'success';
            setTempMsg(msg);
        };

        $scope.setErrorMsg = function(msg) {
            $scope.alertType = 'danger';
            setTempMsg(msg);
        };

        $scope.setInfoMsg = function(msg) {
            $scope.alertType = 'info';
            setTempMsg(msg);
        };

        $scope.setWarningMsg = function(msg) {
            $scope.alertType = 'warning';
            setTempMsg(msg);
        };

        $scope.closeTempMsg = function() {
            $scope.showTempMsg = false;
        };

        var setTempMsg = function(msg) {
            $scope.tempMsg = msg;
            $scope.showTempMsg = true;
        };
        /* END Messages */
    };

    angular.module("medisApp.ctrl")
        .controller("MainCtrl", ["$scope", "$location", mainCtrl]);
}());
