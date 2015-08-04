(function(){
    var videoHomeCtrl = function($scope, $http, categories){
        $scope.videoCategories = categories;
    };

    angular.module("medisApp.ctrl")
        .controller("VideoHomeCtrl", ["$scope", "$http", "categories", videoHomeCtrl]);
}());
