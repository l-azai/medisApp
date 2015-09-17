(function(){

    var testMediaCtrl = function ($scope) {
        $scope.jqAccordionInst = {};

        $scope.jqSwitchAccordion = function (idx) {
            $scope.jqAccordionInst.ngSetActive(idx);
        };


        $scope.accordInst = {};
        $scope.switchAccordion = function (idx) {
            $scope.accordInst.accordion.switch(idx);
        };


    };

    angular.module("medisApp.ctrl")
        .controller("TestMediaCtrl", ["$scope", testMediaCtrl]);
}());
