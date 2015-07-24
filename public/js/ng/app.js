(function(){
    var mod = angular.module("medisApp", ["ngRoute", "ngFileUpload", "ui.bootstrap"]);

    mod.config(function($routeProvider, $locationProvider){
        $routeProvider
            .when("/videos", {
                templateUrl: "partials/videos-home.html",
                controller: "VideoHomeController",
                routeAction: "video.home",
                resolve: {
                    categories: function(VideoFactory) {
                        return VideoFactory.getVideoCategories();
                    }
                }
            })
            .when("/video-categories/:category", {
                templateUrl: "partials/category-items.html",
                controller: "VideoFilesController",
                routeAction: 'video.files',
                resolve: {
                    videos: function(VideoFactory, $route) {
                        return VideoFactory.getVideosByCategory($route.current.params.category);
                    }
                }
            })
            .when("/admin", {
                templateUrl: "partials/admin-home.html",
                controller: "AdminController",
                routeAction: "admin.home",
                resolve: {
                    model: function(AdminFactory, $route) {
                        var page = $route.current.params.page;
                        var limitby = $route.current.params.limitby;
                        var orderby = $route.current.params.orderby;
                        
                        return AdminFactory.getAdminVideoHome(page, limitby, orderby);
                    }
                }
            })
            .when("/admin/video-file/add", {
                templateUrl: "partials/admin-videofile-add.html",
                controller: "AdminVideoController",
                routeAction: "admin.video.add"
            })
            .when("/admin/video-file/:id/edit", {
                templateUrl: "partials/admin-videofile-edit.html",
                controller: "AdminVideoController",
                routeAction: "admin.video.edit"
            })
            .when("/test-media", {
                templateUrl: "partials/test-media.html",
                controller: "TestMediaController"
            })
            .otherwise({
                redirectTo: "/videos"
            });

        $locationProvider.html5Mode(true);
    });
}());
