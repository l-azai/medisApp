(function(){
    var adminFactory = function($http) {
        var getAdminVideoHome = function(page, limitby, orderby) {
            var config = {
                page: page,
                limitby: limitby,
                orderby: orderby
            };

            return $http.get("/api/adminVideoHome", { params: config })
                .then(function(response) {
                    return response.data;
                }, function(response) {
                    console.log('Error: adminVideoHome. ' + response.data);
                });
        };

        return {
            getAdminVideoHome: getAdminVideoHome
        };
    };

    angular.module("medisApp")
        .factory("AdminFactory", ["$http", adminFactory]);
}());
