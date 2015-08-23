(function() {
    function videoSvc($http) {
        function getVideoCategories() {
            return $http.get('/api/getVideoCategoryList');
        };

        function getVideosByCategory(category) {
            return $http.get('/api/getVideosByCategory/' + category);
        };

        function getVideos() {
            return $http.get('/api/getVideos');
        };

        function getVideosByName(name) {
            return $http.get('/api/getVideosByName/' + name); //{ params: { name: name } });
        };

        function getVideoFileById(id) {
            return $http.get('/api/getVideoFileById/' + id); //{ params: { id: id } });
        };

        function deleteVideo(id) {
            return $http.post('/api/deleteVideo/' + id);
        };

        return {
            getVideoCategories: getVideoCategories,
            getVideosByCategory: getVideosByCategory,
            getVideosByName: getVideosByName,
            getVideos: getVideos,
            getVideoFileById: getVideoFileById,
            deleteVideo: deleteVideo
        };
    };

    angular.module("medisApp")
        .factory("VideoSvc", ["$http", videoSvc]);
}());
