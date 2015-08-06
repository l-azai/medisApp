(function() {
    var adminCtrl = function($scope, $route, model, AdminFactory, $modal, VideoFactory) {
        $scope.videoCategories = model.categories;
        $scope.videoFileList = model.videos.files;
        $scope.totalRecords = model.videos.count;
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.pageSizeList = [ 10, 20, 30, 40, 50 ];

        $scope.loadGrid = function() {
            var page = $scope.currentPage;
            var pagesize = $scope.pageSize; // set later
            var sort = ''; // set later
            var search = '';
            var filter = '';

            AdminFactory.getAdminVideoHome(page, pagesize, sort, search, filter)
                .then(function(response) {
                    $scope.videoFileList = response.data.videos.files;
                });
        };

        $scope.confirmDelete = function(id, name) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'partials/confirmation-modal.html',
                size: 'sm',
                controller: 'ModalCtrl',
                resolve: {
                    modalModel: function() {
                        var model = {
                            bodyText: 'Are you sure you want to delete video<br /><strong>' + name + '</strong>?',
                            value: id
                        };
                        return model;
                    }
                }
            });

            modalInstance.result.then(function(id) {
                // call api to delete file
                VideoFactory.deleteVideo(id)
                    .then(function(response) {
                        // TODO: display message
                        debugger;
                        $route.reload();
                    });
            });
        };
    };

    angular.module("medisApp.ctrl")
        .controller("AdminCtrl", ["$scope", "$route", "model", "AdminFactory", "$modal", "VideoFactory", adminCtrl]);
}());
