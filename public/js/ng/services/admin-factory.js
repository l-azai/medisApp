(function(){
    var adminFactory = function($http) {
        var getVideoSearchResults = function(searchQuery) {
            return $http.get("/api/adminVideoSearchResults", { params: searchQuery });
        };

        return {
            getVideoSearchResults: getVideoSearchResults
        };
    };

    angular.module("medisApp")
        .factory("AdminFactory", ["$http", adminFactory]);
}());
