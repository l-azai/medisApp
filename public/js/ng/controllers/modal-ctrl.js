(function() {
    var modalCtrl = function($scope, $modalInstance, modalModel) {
        $scope.bodyText = modalModel.bodyText;

        $scope.ok = function() {
            $modalInstance.close(modalModel.value);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    };

    angular.module("medisApp.ctrl")
        .controller("ModalCtrl", ["$scope", "$modalInstance", "modalModel", modalCtrl]);
}());
