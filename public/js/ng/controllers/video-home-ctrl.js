(function(){
    var videoHomeCtrl = function($scope, $http, categories){
        $scope.videoCategories = categories;
    };

    angular.module("medisApp")
        .controller("VideoHomeCtrl", ["$scope", "$http", "categories", videoHomeCtrl]);
}());
