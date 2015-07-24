(function(){
    var vhController = function($scope, $http, categories){
        $scope.videoCategories = categories;
    };

    angular.module("medisApp")
        .controller("VideoHomeController", ["$scope", "$http", "categories", vhController]);
}());
