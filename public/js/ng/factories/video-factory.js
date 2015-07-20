(function(){
    var videoFactory = function($http){
        var getVideoCategories = function() {
            return $http.get('/api/getVideoCategoryList');
        };

        var getVideoFilesForCategory = function(category) {
            return $http.get('/api/getVideoFilesFromCategory/' + category);
        };

        var getAllVideoFiles = function() {
            return $http.get('/api/getAllVideoFiles');
        };

        var getVideoFileById = function(id) {
            return $http.get('/api/getVideoFileById/' + id);
        }

        return {
            getVideoCategories: getVideoCategories,
            getVideoFilesForCategory: getVideoFilesForCategory,
            getAllVideoFiles: getAllVideoFiles,
            getVideoFileById: getVideoFileById
        };
    };

    angular.module("medisApp")
        .factory("VideoFactory", ["$http", videoFactory]);
}());
