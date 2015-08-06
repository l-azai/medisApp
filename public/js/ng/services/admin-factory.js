(function(){
    var adminFactory = function($http) {
        var getVideoSearchResults = function(page, pagesize, sort, search, categoryFilter) {
            var config = {
                page: page,
                pagesize: pagesize,
                sort: sort,
                search: search,
                categoryFilter: categoryFilter
            };

            return $http.get("/api/adminVideoSearchResults", { params: config });
        };

        return {
            getVideoSearchResults: getVideoSearchResults
        };
    };

    angular.module("medisApp")
        .factory("AdminFactory", ["$http", adminFactory]);
}());
