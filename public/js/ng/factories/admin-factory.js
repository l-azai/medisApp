(function(){
    var adminFactory = function($http) {
        var getAdminVideoHome = function() {
            return $http.get("/api/adminVideoHome")
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
