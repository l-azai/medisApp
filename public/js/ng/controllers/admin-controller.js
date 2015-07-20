(function(){
    var adminController = function ($scope, $http, $route, AdminFactory, VideoFactory, $q) {
        VideoFactory.getVideoCategories().then(function(response){
            $scope.videoCategories = response.data;
        });

        VideoFactory.getVideoFilesForCategory('animations').then(function(response){
            $scope.videoFileList = response.data;
        });
    };

    angular.module("medisApp")
        .controller("AdminController",
        ["$scope", "$http", "$route", "AdminFactory", "VideoFactory", "$q", adminController]);
}());
