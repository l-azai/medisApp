(function() {
    var modalCtrl = function($scope, $modalInstance, modalModel) {
        $scope.bodyText = modalModel.bodyText;

        $scope.yes = function() {
            $modalInstance.close(modalModel.value);
        };

        $scope.no = function() {
            $modalInstance.dismiss('cancel');
        };
    };

    angular.module("medisApp.ctrl")
        .controller("ModalCtrl", ["$scope", "$modalInstance", "modalModel", modalCtrl]);
}());
