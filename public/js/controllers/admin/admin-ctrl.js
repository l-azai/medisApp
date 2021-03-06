(function() {
    function adminCtrl($scope, $route, $modal, model, AdminSvc, VideoSvc, MessageSvc) {
        // model
        $scope.videoCategories = model.categories;
        $scope.videoSearchResults = model.videos.files;
        $scope.totalRecords = model.videos.count;
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.pageSizeList = [ 10, 20, 30, 40, 50 ];

        $scope.videosByName = function(name) {
            return VideoSvc.getVideosByName(name)
                .then(function(response) {
                    return response.data.map(function(item) {
                        return item.name;
                    });
                });
        };

        $scope.orderBy = function(prop) {
            $scope.sortDesc = $scope.sortName != prop ? true : !$scope.sortDesc;
            $scope.sortName = prop;
            $scope.loadGrid();
        };

        $scope.loadGrid = function() {
            var searchQuery = {
                page: $scope.currentPage,
                pagesize: $scope.pageSize,
                sortName: $scope.sortName,
                sortDesc: $scope.sortDesc,
                search: $scope.searchText,
                categoryFilter: $scope.categoryFilter
            };

            AdminSvc.getVideoSearchResults(searchQuery)
                .then(function(response) {
                    $scope.videoSearchResults = response.data.videos.files;
                    $scope.totalRecords = response.data.videos.count;
                });
        };

        $scope.confirmDelete = function(id, name) {
            var modalInstance = $modal.open({
                animation: false, // TODO: previously true, breaking change on ngAnimate that causes backdrop to not disappear
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
                VideoSvc.deleteVideo(id)
                    .then(function(response) {
                        $scope.loadGrid();
                        MessageSvc.setSuccessMsg('Video deleted');
                    });
            });
        };
    };

    angular.module("medisApp.ctrl")
        .controller("AdminCtrl", ["$scope", "$route", "$modal", "model", 
            "AdminSvc", "VideoSvc", "MessageSvc",
        adminCtrl]);
}());
