(function(){
    var adminFactory = function($http) {
        var getAdminVideoHome = function(page, pagesize, sort, search, filter) {
            var config = {
                page: page,
                pagesize: pagesize,
                sort: sort,
                search: search,
                filter: filter
            };

            return $http.get("/api/adminVideoHome", { params: config });
        };

        return {
            getAdminVideoHome: getAdminVideoHome
        };
    };

    angular.module("medisApp")
        .factory("AdminFactory", ["$http", adminFactory]);
}());
