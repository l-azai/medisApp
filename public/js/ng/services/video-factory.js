(function(){
    var videoService = function($http){
        var getVideoCategories = function() {
            return $http.get('/api/getVideoCategoryList');
        };

        var getVideoFilesForCategory = function(category) {
            return $http.get('/api/getVideoFilesFromCategory/' + category);
        };

        var getAllVideoFiles = function() {
            return $http.get('/api/getAllVideoFiles');
        };

        return {
            getVideoCategories: getVideoCategories,
            getVideoFilesForCategory: getVideoFilesForCategory,
            getAllVideoFiles: getAllVideoFiles
        };
    };

    angular.module("medisApp")
        .factory("VideoService", ["$http", videoService]);
}());
