(function(){

    var testMediaCtrl = function ($scope) {
        $scope.accordInst = {};

        $scope.switchAccordion = function (idx) {
            $scope.accordInst.accordion.switch(idx);
        };
        
        $scope.testAlert = function () {
            alert('test alert');
        }

        $scope.options = {
            beforeActivate: $scope.testAlert
        };
    };

    angular.module("medisApp.ctrl")
        .controller("TestMediaCtrl", ["$scope", testMediaCtrl]);
}());
