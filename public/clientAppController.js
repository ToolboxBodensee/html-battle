/* global app */
app.controller('AppController', function (
    $controller
    , $log
    , $rootScope
    , $scope
    , $translate
    , BattleSocket
)
{
    $scope.connected = false;






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


    
$log.log('Ready');


});