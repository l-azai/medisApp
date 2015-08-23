(function(){
    function messageSvc($rootScope) {
        var alert = {
            type: '',
            msg: ''
        };

        function getMsg() {
            return alert;
        };

        function setSuccessMsg(msg) {
            alert.type = 'success';
            setTempMsg(msg);
        };

        function setErrorMsg(msg) {
            alert.type = 'danger';
            setTempMsg(msg);
        };

         function setInfoMsg(msg) {
            alert.type = 'info';
            setTempMsg(msg);
        };

        function setWarningMsg(msg) {
            alert.type = 'warning';
            setTempMsg(msg);
        };

        /* private fn */
        function setTempMsg(msg) {
            alert.msg = msg;
            notifyMsg();
        }

        function notifyMsg() {
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
