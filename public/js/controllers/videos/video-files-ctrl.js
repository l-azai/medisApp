(function(){
    var videoFilesCtrl = function($scope, videos){
        $scope.videoFiles = videos;
    };

    angular.module("medisApp.ctrl")
        .controller("VideoFilesCtrl", ["$scope", "videos", videoFilesCtrl]);
}());
