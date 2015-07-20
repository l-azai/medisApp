(function(){
    var allowNullFilter = function(){

        return function(input, param1){
            if(!param1) {
                return input;
            }

            var filtered = input.filter(function(obj, index) {
                for (var prop in obj) {
                    if(obj.hasOwnProperty(prop) && param1.hasOwnProperty(prop)) {

                        if(param1[prop]){
                            switch (typeof param1[prop]) {
                                case 'string':
                                    return angular.lowercase(obj[prop]).indexOf(angular.lowercase(param1[prop])) > -1;
                                    break;
                                case 'number':
                                    return obj[prop] === param1[prop];
                                    break;
                                default:
                                    return false;
                                    break;
                            }
                        } else {
                            return true;
                        }
                    }
                };
            });

            return filtered;
        };
    };

    angular.module("medisApp")
        .filter("allowNullFilter", allowNullFilter);
}());
