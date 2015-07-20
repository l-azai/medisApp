(function(){
    var adminFactory = function($http) {
        var getAdminHomeViewModel = function(){
            return $http.get("/api/adminHomeViewModel");
        };

        return {
            getAdminHomeViewModel: getAdminHomeViewModel
        };
    };

    angular.module("medisApp")
        .factory("AdminFactory", ["$http", adminFactory]);
}());
