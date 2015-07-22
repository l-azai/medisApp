(function(){
    var adminVideoController = function($scope, $http, $route, $routeParams,
        $location, Upload, VideoFactory) {

        /* route handlers */
        switch ($route.current.routeAction) {
            case 'admin.video.add':
                loadVideoAddModel();
                break;
            case 'admin.video.edit':
                loadVideoEditModel();
                break;
        }

        /* controller functions */
        function loadVideoAddModel() {
            $scope.videoAddModel = {};
            $scope.videoAddModel.formData = {};
            $scope.videoAddModel.imageUploadProgress = 0;
            var addVideoForm;

            VideoFactory.getVideoCategories()
                .then(function(response){
                    $scope.videoAddModel.videoCategories = response.data;

                    VideoFactory.getVideoFilesForCategory('animations') // hardcode for now, gets animation category
                        .then(function(response){
                            $scope.videoAddModel.movies = response.data;
                        });
                });

            $scope.videoAddModel.addVideoFile = function(form){
                addVideoForm = form;
                var postData = {
                    videoCategoryId: $scope.videoAddModel.formData.categoryId,
                    videoFilename: $scope.videoAddModel.formData.videoName,
                    yearReleased: $scope.videoAddModel.formData.yearReleased
                };

                Upload.upload({
                    url: '/api/addVideoFile',
                    fields: postData,
                    file: $scope.videoAddModel.formData.imageFile
                })
                .progress(function(evt) {
                    $scope.videoAddModel.imageUploadProgress = parseInt(100.0 * evt.loaded / evt.total);
                })
                .success(function(data, status, headers, config) {
                    if(data.err){
                        $scope.videoAddModel.msg = err.message;
                    } else {
                        $scope.videoAddModel.formData.imageFile = undefined;
                        $scope.videoAddModel.formData = {};
                        $scope.videoAddModel.msg = 'video file has been added successfully';
                        addVideoForm.$setPristine();
                    }
                })
                .error(function(data){
                    $scope.videoAddModel.msg = "An error occurred trying to add the video file. " + data;
                });
            };

            // $scope.videoAddModel.uploadVideo = function() {
            //     //$scope.videoUploader.uploadAll();
            // };
        };

        function loadVideoEditModel() {
            $scope.videoEditModel = {};
            $scope.videoEditModel.hasImage = false;
            $scope.videoEditModel.hasVideo = false;
            $scope.videoEditModel.showUploadImage = false;
            $scope.videoEditModel.formData = {};

            $scope.videoEditModel.toggleUploadImage = function(showUpload) {
                $scope.videoEditModel.showUploadImage = showUpload;
            };

            $scope.videoEditModel.toggleUploadVideo = function(showUpload) {
                $scope.videoEditModel.showUploadVideo = showUpload;
            };

            VideoFactory.getVideoCategories()
                .then(function(response){
                    $scope.videoEditModel.videoCategories = response.data;

                    // get VideoEditModel or Categories
                    VideoFactory.getVideoFileById($routeParams.id).then(function(response){
                        $scope.videoEditModel.formData.categoryId = response.data.catId;
                        $scope.videoEditModel.formData.videoName = response.data.name;
                        $scope.videoEditModel.formData.yearReleased = response.data.yearReleased;
                        $scope.videoEditModel.hasImage = response.data.imageGfsFilename ? true : false;
                        $scope.videoEditModel.hasVideo = response.data.videoGfsFilename ? true : false;
                    });
                });
        };
    };

    angular.module("medisApp")
        .controller("AdminVideoController", ["$scope", "$http", "$route", "$routeParams",
        "$location", "Upload", "VideoFactory", adminVideoController]);
}());
