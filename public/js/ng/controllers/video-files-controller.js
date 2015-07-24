(function(){
    var vfController = function($scope, $http, videos){
        $scope.videoFiles = videos;
    };

    angular.module("medisApp")
        .controller("VideoFilesController", ["$scope", "$http", "videos", vfController]);
}());
