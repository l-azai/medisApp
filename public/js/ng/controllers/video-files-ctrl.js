(function(){
    var videoFilesCtrl = function($scope, $http, videos){
        $scope.videoFiles = videos;
    };

    angular.module("medisApp.ctrl")
        .controller("VideoFilesCtrl", ["$scope", "$http", "videos", videoFilesCtrl]);
}());
