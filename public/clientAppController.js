/* global app */
app.controller('AppController', function (
      $controller
    , $interval
    , $log
    , $rootScope
    , $scope
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

    $scope.clientId   = ClientIdProvider.getClientId();
    $scope.connected  = false;
    $scope.saveTimer  = null;
    $scope.sourceCode = {
        css:  '* { background: \'red\'; }',
        html: '<h1>Hello w0rld</h1>'
    };





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

    /**
     * #################################################################################################################
     * ### Public scope methods                                                                                      ###
     * #################################################################################################################
     */

    $scope.getSourceCode = function ()
    {
        var sourceCode = '';

        sourceCode += '<html>';
        sourceCode += '<head>';
        sourceCode += '<style style="text/css">';
        sourceCode += $scope.sourceCode.css;
        sourceCode += '</style>';
        sourceCode += '</head>';
        sourceCode += '<body>';
        sourceCode += $scope.sourceCode.html;
        sourceCode += '</body>';
        sourceCode += '</html>';

        $log.log('AppController: getSourceCode', sourceCode);

        return sourceCode;
    };

    $scope.init = function ()
    {
        $log.log('AppController: ready');

        $scope.initTimer();
    };



    $scope.initTimer = function ()
    {
        $scope.saveTimer = $interval($scope.sendSourceCode, 2500);
    };

    // BattleSocket.upload

    $scope.sendSourceCode = function ()
    {
        $log.log('AppController: sendSourceCode');

        var sourceCode = $scope.getSourceCode();

        BattleSocket.upload($scope.clientId, sourceCode);
    };

    // TODO: ACE

    /**
     * #################################################################################################################
     * ### After initialization                                                                                      ###
     * #################################################################################################################
     */

    $scope.init();
});