(function(){
    var adminVideoEditCtrl = function($scope, Upload, model) {
        $scope.videoCategories = model.videoCategories;
        $scope.hasImage = model.hasImage;
        $scope.hasVideo = model.hasVideo;
        $scope.showUploadImage = false;
        $scope.imageUploadProgress = 0;

        $scope.formData = {};
        $scope.formData.id = model.id;
        $scope.formData.categoryId = model.categoryId;
        $scope.formData.videoName = model.videoName;
        $scope.formData.yearReleased = model.yearReleased;
        var editVideoForm;

        $scope.toggleUploadImage = function(showUpload) {
            $scope.showUploadImage = showUpload;
        };

        $scope.toggleUploadVideo = function(showUpload) {
            $scope.showUploadVideo = showUpload;
        };

        $scope.updateVideo = function(form) {
            editVideoForm = form;
            var postData = {
                id: $scope.formData.id,
                videoFilename: $scope.formData.videoName,
                videoCategoryId: $scope.formData.categoryId,
                yearReleased: $scope.formData.yearReleased
            };

            Upload.upload({
                url: '/api/updateVideoById',
                fields: postData,
                file: $scope.formData.imageFile
            })
            .progress(function(evt) {
                $scope.imageUploadProgress = parseInt(100.0 * evt.loaded / evt.total);
            })
            .success(function(data, status, headers, config) {
                if(data.err){
                    $scope.msg = err.message;
                } else {
                    $scope.formData.imageFile = undefined;
                    $scope.msg = 'Video has been updated successfully';
                    editVideoForm.$setPristine();
                }
            })
            .error(function(data){
                $scope.msg = "An error occurred trying to add the video file. " + data;
            });
        };
    };

    angular.module("medisApp.ctrl")
        .controller("AdminVideoEditCtrl", ["$scope", "Upload", "model", adminVideoEditCtrl]);
}());
