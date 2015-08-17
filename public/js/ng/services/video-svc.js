(function(){
    var videoSvc = function($http){
        var getVideoCategories = function() {
            return $http.get('/api/getVideoCategoryList');
        };

        var getVideosByCategory = function(category) {
            return $http.get('/api/getVideosByCategory/' + category);
        };

        var getVideos = function() {
            return $http.get('/api/getVideos');
        };

        var getVideoFileById = function(id) {
            return $http.get('/api/getVideoFileById/' + id);
        };

        var deleteVideo = function(id) {
            return $http.post('/api/deleteVideo/' + id);
        };

        return {
            getVideoCategories: getVideoCategories,
            getVideosByCategory: getVideosByCategory,
            getVideos: getVideos,
            getVideoFileById: getVideoFileById,
            deleteVideo: deleteVideo
        };
    };

    angular.module("medisApp")
        .factory("VideoSvc", ["$http", videoSvc]);
}());
