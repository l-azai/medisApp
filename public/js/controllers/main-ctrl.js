(function(){
    var mainCtrl = function($rootScope, $scope, $location, MessageSvc) {

        $scope.activeNavClass = function(path) {
            return $location.path().indexOf(path) === 0
                ? 'active'
                : '';
        };

        // test alert
        // $scope.setErrorMsg = function(msg) {
        //     $scope.alertType = 'danger';
        //     setTempMsg(msg);
        // };

        /* config when route changes */
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            // so any temp messages do not persist
            $scope.closeTempMsg();
            //$scope.alertType = 'info';
            //setTempMsg('test');
        });
        
        $rootScope.$on('NewMsgNotification', function() {
            var alert = MessageSvc.getMsg();
            $scope.alertType = alert.type;
            setTempMsg(alert.msg);
        });

        $scope.closeTempMsg = function() {
            $scope.showTempMsg = false;
        };

        function setTempMsg(msg) {
            $scope.tempMsg = msg;
            $scope.showTempMsg = true;
        };
    };

    angular.module("medisApp.ctrl")
        .controller("MainCtrl", ["$rootScope", "$scope", "$location", "MessageSvc", mainCtrl]);
}());
