(function(){
    var videoFactory = function($http){
        var getVideoCategories = function() {
            return $http.get('/api/getVideoCategoryList')
                .then(function(response) {
                    return response.data;
                }, function(response){
                    console.log('Error: getVideoCategories. ' + response.data);
                });
        };

        var getVideosByCategory = function(category) {
            return $http.get('/api/getVideosByCategory/' + category)
                .then(function(response) {
                    return response.data;
                }, function(response){
                    console.log('Error: getVideosByCategory. ' + response.data);
                });
        };

        var getAllVideos = function() {
            return $http.get('/api/getAllVideos')
                .then(function(response) {
                    return response.data;
                }, function(response){
                    console.log('Error: getAllVideos. ' + response.data);
                });
        };

        var getVideoFileById = function(id) {
            return $http.get('/api/getVideoFileById/' + id)
                .then(function(response) {
                    return response.data;
                }, function(response){
                    console.log('Error: getVideoFileById. ' + response.data);
                });
        }

        return {
            getVideoCategories: getVideoCategories,
            getVideosByCategory: getVideosByCategory,
            getAllVideos: getAllVideos,
            getVideoFileById: getVideoFileById
        };
    };

    angular.module("medisApp")
        .factory("VideoFactory", ["$http", videoFactory]);
}());
