(function(){
    var navCtrl = function($scope, $location) {

        $scope.activeNavClass = function(path){
            return $location.path().indexOf(path) === 0
                ? 'active'
                : '';
        };
    };

    angular.module("medisApp.ctrl")
        .controller("NavCtrl", ["$scope", "$location", navCtrl]);
}());