/* global app */
app.controller('AppController', function (
      $controller
    , $interval
    , $log
    , $rootScope
    , $scope
    , $sce
    , $timeout
    , $translate
    , BattleSocket
    , ClientIdProvider
)
{
    /**
     * #################################################################################################################
     * ### Properties                                                                                                ###
     * #################################################################################################################
     */

    $scope.clientId    = ClientIdProvider.getClientId();
    $scope.connected   = false;
    $scope.sourceCodes = {};




    /**
     * #################################################################################################################
     * ### Event listeners                                                                                           ###
     * #################################################################################################################
     */

    $scope.$on('socket:connect', function (event, data) {
        $log.log('BattleSocket: connect', event, data);

        $scope.connected = true;
    });

    $scope.$on('socket:error', function (event, data) {
        $log.log('BattleSocket: error', event, data);

    });

    $scope.$on('socket:disconnect', function (event, data) {
        $log.log('BattleSocket: disconnect', event, data);

        
    });

    $scope.$on('socket:connect_error', function (event, data) {
        $log.log('BattleSocket: connect_error', event, data);


    });

    $scope.$on('socket:reconnecting', function (event, data) {
        $log.log('BattleSocket: reconnecting', event, data);


    });

    $scope.$on('socket:reconnect_attempt', function (event, data) {
        $log.log('BattleSocket: reconnect_attempt', event, data);


    });

    $scope.$on('socket:receive_upload', function (event, data) {
        $log.log('BattleSocket: receive_upload', event, data);
//
        var iFrameSourceCode =  'data:text/html;charset=utf-8,' + encodeURIComponent(data.sourceCode);

        $log.log('BattleSocket: iFrameSourceCode', iFrameSourceCode);

        var trustedIFrameSourceCode = $sce.getTrustedResourceUrl(iFrameSourceCode);


        $scope.sourceCodes[data.id] = iFrameSourceCode;
    });

    /**
     * #################################################################################################################
     * ### Public scope methods                                                                                      ###
     * #################################################################################################################
     */

    $scope.init = function ()
    {
        $log.log('AppController: ready');




    };




    /**
     * #################################################################################################################
     * ### After initialization                                                                                      ###
     * #################################################################################################################
     */

    $scope.init();
});