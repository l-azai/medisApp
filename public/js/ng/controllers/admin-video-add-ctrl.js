(function(){
    var adminVideoAddCtrl = function($scope, Upload, model) {
        $scope.videoCategories = model;
        $scope.formData = {};
        $scope.imageUploadProgress = 0;
        var addVideoForm;

        $scope.addVideo = function(form){
            addVideoForm = form;
            var postData = {
                videoFilename: $scope.formData.videoName,
                videoCategoryId: $scope.formData.categoryId,
                yearReleased: $scope.formData.yearReleased
            };

            Upload.upload({
                url: '/api/addVideo',
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
                    $scope.disableForm = true;
                    $scope.setSuccessMsg('Video has been added successfully');
                    addVideoForm.$setPristine();
                }
            })
            .error(function(data){
                $scope.setErrorMsg("An error occurred trying to add the video file. " + data);
            });
        };
    };

    angular.module("medisApp.ctrl")
        .controller("AdminVideoAddCtrl", ["$scope", "Upload", "model", adminVideoAddCtrl]);
}());
