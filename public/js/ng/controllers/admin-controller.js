(function(){
    var adminController = function ($scope, model) {
        $scope.videoCategories = model.categories;
        $scope.videoFileList = model.videos;
    };

    angular.module("medisApp")
        .controller("AdminController", ["$scope", "model", adminController]);
}());
