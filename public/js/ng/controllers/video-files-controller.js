(function(){
    var vfController = function($scope, $http, $routeParams, VideoFactory){

        VideoFactory.getVideoFilesForCategory($routeParams.category)
            .then(function(response){
                // check server status later (response.status)
                $scope.videoFiles = response.data;
            });
    };

    angular.module("medisApp")
        .controller("VideoFilesController", ["$scope", "$http", "$routeParams", "VideoFactory", vfController]);
}());
