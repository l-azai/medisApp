(function(){
    
    var testMediaController = function($scope, $http, $routeParams){
        $scope.deleteFile = function(){
            $http.post('/api/deleteFile/1')
                .then(function(response){
                    $scope.message = "delete successful";
            });
        };
    };
    
    angular.module("medisApp")
        .controller("TestMediaController", ["$scope", "$http", "$routeParams", testMediaController]);
}());