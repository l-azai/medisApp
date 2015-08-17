(function(){
    var customArgsFactory = function() {
        var factory = {};

        factory.showAllIfNull = function (actual, expected) {
            if (angular.isString(actual)) {
                return angular.lowercase(actual).indexOf(angular.lowercase(expected)) > -1;
            }

            if (!expected) {
               return true;
            }
            return angular.equals(expected, actual);
        };

        return factory;
    };

    angular.module("medisApp")
        .factory("CustomArgsFactory", customArgsFactory);
}());
