(function(){

    var testMediaCtrl = function($scope){
        $scope.switchAccordion = function (idx) {
            $scope.swAccordion.switchAccord(idx);
        };
    };

    angular.module("medisApp.ctrl")
        .controller("TestMediaCtrl", ["$scope", testMediaCtrl]);
}());
