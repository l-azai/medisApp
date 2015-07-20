(function(){
    var vhController = function($scope, $http, VideoFactory){

        VideoFactory.getVideoCategories()
            .then(function(response){
                // check server status later (response.status)
                $scope.videoCategories = response.data;
            });

    };

    angular.module("medisApp")
        .controller("VideoHomeController", ["$scope", "$http", "VideoFactory", vhController]);
}());
