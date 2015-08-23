(function(){
    var videoHomeCtrl = function($scope, categories){
        $scope.videoCategories = categories;
    };

    angular.module("medisApp.ctrl")
        .controller("VideoHomeCtrl", ["$scope", "categories", videoHomeCtrl]);
}());
