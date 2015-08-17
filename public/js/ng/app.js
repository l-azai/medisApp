(function(){
    var mod = angular.module("medisApp",
        ["medisApp.ctrl", "medisApp.svc", "medisApp.filters", "medisApp.directives",
        "ngRoute", "ngFileUpload", "ui.bootstrap", "ngSanitize", "ngAnimate"]);

    mod.config(function($routeProvider, $locationProvider){
        $routeProvider
            .when("/videos", {
                templateUrl: "/partials/videos-index.html",
                controller: "VideoHomeCtrl",
                resolve: {
                    categories: function(VideoSvc) {
                        return VideoSvc.getVideoCategories()
                            .then(function(response) {
                                return response.data;
                            }, function(response){
                                console.log('Error: getVideoCategories. ' + response.data);
                            });
                    }
                }
            })
            .when("/videos/:category", {
                templateUrl: "/partials/category-videos.html",
                controller: "VideoFilesCtrl",
                resolve: {
                    videos: function(VideoSvc, $route) {
                        return VideoSvc.getVideosByCategory($route.current.params.category)
                            .then(function(response) {
                                return response.data;
                            }, function(response){
                                console.log('Error: videos by category. ' + response.data);
                            });
                    }
                }
            })
            .when("/admin/videos", {
                templateUrl: "/partials/admin/admin-videos.html",
                controller: "AdminCtrl",
                resolve: {
                    model: function(AdminSvc) {
                        return AdminSvc.getVideoSearchResults()
                            .then(function(response) {
                                return response.data;
                            }, function(response) {
                                console.log('Error: admin videos. ' + response.data);
                            });
                    }
                }
            })
            .when("/admin/video/add", {
                templateUrl: "/partials/admin/admin-video-add.html",
                controller: "AdminVideoAddCtrl",
                resolve: {
                    model: function(VideoSvc) {
                        return VideoSvc.getVideoCategories()
                            .then(function(response){
                                return response.data;
                            }, function(response) {
                                console.log('Error: AdminVideoAdd. ' + response.data);
                            });
                    }
                }
            })
            .when("/admin/video/:id/edit", {
                templateUrl: "/partials/admin/admin-video-edit.html",
                controller: "AdminVideoEditCtrl",
                resolve: {
                    model: function(VideoSvc, $q, $route) {
                        var promiseCat = VideoSvc.getVideoCategories();
                        var promiseVideoFile = VideoSvc.getVideoFileById($route.current.params.id);

                        return $q.all([promiseCat, promiseVideoFile]).then(function(response){
                                    var videoEditModel = {};
                                    videoEditModel.videoCategories = response[0].data;

                                    videoEditModel.id = response[1].data._id;
                                    videoEditModel.categoryId = response[1].data.catId;
                                    videoEditModel.videoName = response[1].data.name;
                                    videoEditModel.yearReleased = response[1].data.yearReleased;
                                    videoEditModel.hasImage = response[1].data.imageGfsFilename ? true : false;
                                    videoEditModel.hasVideo = response[1].data.videoGfsFilename ? true : false;

                                    return videoEditModel;
                                });
                    }
                }
            })
            .when("/test-media", {
                templateUrl: "/partials/test-media.html",
                controller: "TestMediaCtrl"
            })
            .otherwise({
                redirectTo: "/videos"
            });

        $locationProvider.html5Mode(true);
    });
}());
