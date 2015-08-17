(function(){
    var messageSvc = function($rootScope) {
        var alert = {
            type: '',
            msg: ''
        };

        var getMsg = function() {
            return alert;
        };

        var setSuccessMsg = function(msg) {
            alert.type = 'success';
            setTempMsg(msg);
        };

        var setErrorMsg = function(msg) {
            alert.type = 'danger';
            setTempMsg(msg);
        };

        var setInfoMsg = function(msg) {
            alert.type = 'info';
            setTempMsg(msg);
        };

        var setWarningMsg = function(msg) {
            alert.type = 'warning';
            setTempMsg(msg);
        };

        /* private fn */
        var setTempMsg = function(msg) {
            alert.msg = msg;
            notifyMsg();
        }

        var notifyMsg = function() {
            $rootScope.$emit('NewMsgNotification')
        };
        /* END private fn */

        return {
            getMsg: getMsg,
            setSuccessMsg: setSuccessMsg,
            setErrorMsg: setErrorMsg,
            setInfoMsg: setWarningMsg,
            setWarningMsg: setWarningMsg
        };
    };

    angular.module("medisApp")
        .factory("MessageSvc", ["$rootScope", messageSvc]);
}());
