(function(){
    var adminController = function ($scope, model, AdminFactory, $q) {
        $scope.videoCategories = model.categories;
        $scope.videoFileList = model.videos.files;
        $scope.totalRecords = model.videos.count;
        $scope.currentPage = 1;

        $scope.onPageChange = function(a, b){
            var page = $scope.currentPage;
            var pagesize = 10; // set later
            var sort = ''; // set later
            var search = '';
            var filter = '';

            AdminFactory.getAdminVideoHome(page, pagesize, sort, search, filter)
                .then(function(response){
                    $scope.videoFileList = response.data.videos.files;
                });
        };
    };

    angular.module("medisApp")
        .controller("AdminController", ["$scope", "model", "AdminFactory", "$q", adminController]);
}());
