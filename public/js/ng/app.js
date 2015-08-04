(function(){
    var mod = angular.module("medisApp",
    ["medisApp.ctrl", "medisApp.svc", "medisApp.filters",
    "ngRoute", "ngFileUpload", "ui.bootstrap", "ngSanitize"]);

    mod.config(function($routeProvider, $locationProvider){
        $routeProvider
            .when("/videos", {
                templateUrl: "partials/videos-home.html",
                controller: "VideoHomeCtrl",
                routeAction: "video.home",
                resolve: {
                    categories: function(VideoFactory) {
                        return VideoFactory.getVideoCategories()
                            .then(function(response) {
                                return response.data;
                            }, function(response){
                                console.log('Error: getVideoCategories. ' + response.data);
                            });
                    }
                }
            })
            .when("/video-categories/:category", {
                templateUrl: "partials/category-items.html",
                controller: "VideoFilesCtrl",
                routeAction: 'video.files',
                resolve: {
                    videos: function(VideoFactory, $route) {
                        return VideoFactory.getVideosByCategory($route.current.params.category)
                            .then(function(response) {
                                return response.data;
                            }, function(response){
                                console.log('Error: getVideosByCategory. ' + response.data);
                            });
                    }
                }
            })
            .when("/admin", {
                templateUrl: "partials/admin-home.html",
                controller: "AdminCtrl",
                routeAction: "admin.home",
                resolve: {
                    model: function(AdminFactory) {
                        return AdminFactory.getAdminVideoHome()
                            .then(function(response) {
                                return response.data;
                            }, function(response) {
                                console.log('Error: adminVideoHome. ' + response.data);
                            });
                    }
                }
            })
            .when("/admin/video-file/add", {
                templateUrl: "partials/admin-videofile-add.html",
                controller: "AdminVideoAddCtrl",
                resolve: {
                    model: function(VideoFactory) {
                        return VideoFactory.getVideoCategories()
                            .then(function(response){
                                return response.data;
                            }, function(response) {
                                console.log('Error: AdminVideoAdd. ' + response.data);
                            });
                    }
                }
            })
            .when("/admin/video-file/:id/edit", {
                templateUrl: "partials/admin-videofile-edit.html",
                controller: "AdminVideoEditCtrl",
                resolve: {
                    model: function(VideoFactory, $q, $route) {
                        var promiseCat = VideoFactory.getVideoCategories();
                        var promiseVideoFile = VideoFactory.getVideoFileById($route.current.params.id);

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
                templateUrl: "partials/test-media.html",
                controller: "TestMediaCtrl"
            })
            .otherwise({
                redirectTo: "/videos"
            });

        $locationProvider.html5Mode(true);
    });
}());
