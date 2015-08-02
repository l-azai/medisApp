(function(){
    var mod = angular.module("medisApp", ["ngRoute", "ngFileUpload", "ui.bootstrap", "ngSanitize"]);

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
                    model: function(VideoFactory, $route) {
                        var videoEditModel = {};

                        return VideoFactory.getVideoCategories()
                            .then(function(response){
                                videoEditModel.videoCategories = response.data;

                                return VideoFactory.getVideoFileById($route.current.params.id).
                                    then(function(response2){
                                        videoEditModel.id = response2.data._id;
                                        videoEditModel.categoryId = response2.data.catId;
                                        videoEditModel.videoName = response2.data.name;
                                        videoEditModel.yearReleased = response2.data.yearReleased;
                                        videoEditModel.hasImage = response2.data.imageGfsFilename ? true : false;
                                        videoEditModel.hasVideo = response2.data.videoGfsFilename ? true : false;

                                        return videoEditModel;
                                });
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
