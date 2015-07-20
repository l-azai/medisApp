(function(){
    var navController = function($scope, $location) {

        $scope.activeNavClass = function(path){
            return $location.path().indexOf(path) === 0;
        };
    };

    angular.module("medisApp")
        .controller("NavController", ["$scope", "$location", navController]);
}());
