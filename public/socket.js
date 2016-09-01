app.factory('BattleSocket', function (
      $log
    , socketFactory
    , ClientIdProvider
    , TypeProvider
) {
    $log.log('BattleSocket: initializing');

    var socketUrl = 'http://192.168.3.223:8080';
    socketUrl = 'http://localhost:8080';

    $log.log('BattleSocket: socket url', socketUrl);

    var BattleSocketIO = io.connect(socketUrl, { secure: true, query: 'type=' + TypeProvider.getType() + '&id=' + ClientIdProvider.getClientId() });
    var BattleSocket   = socketFactory({
        ioSocket: BattleSocketIO
    });

    BattleSocket.forward('error');
    BattleSocket.forward('connect');
    BattleSocket.forward('connect_error');
    BattleSocket.forward('disconnect');
    BattleSocket.forward('reconnect_attempt');
    BattleSocket.forward('reconnect_error');
    BattleSocket.forward('reconnect_failed');
    BattleSocket.forward('reconnecting');
    BattleSocket.forward('unauthorized');
    BattleSocket.forward('receive_quest');
    BattleSocket.forward('receive_points');
    BattleSocket.forward('receive_upload');
    BattleSocket.forward('lock_disabled');
    BattleSocket.forward('lock_enabled');
    BattleSocket.forward('disable_lock');
    BattleSocket.forward('enable_lock');

    BattleSocket.addPoints = function (clientId, points)
    {
        $log.log('BattleSocket: addPoints', clientId, points);

        BattleSocketIO.emit('client_add_points', {
            id:       clientId,
            points: points
        });
    };

    BattleSocket.clearCode = function ()
    {
        $log.log('BattleSocket: clearCode');

        BattleSocketIO.emit('clear_code', {});
    };

    BattleSocket.disableLock = function ()
    {
        $log.log('BattleSocket: disable_lock');

        BattleSocketIO.emit('disable_lock', {});
    };

    BattleSocket.enableLock = function ()
    {
        $log.log('BattleSocket: enable_lock');

        BattleSocketIO.emit('enable_lock', {});
    };

    BattleSocket.fullReset = function ()
    {
        $log.log('BattleSocket: fullReset');

        BattleSocketIO.emit('full_reset', {});
    };

    BattleSocket.setQuest = function (quest)
    {
        $log.log('BattleSocket: setQuest', quest);

        BattleSocketIO.emit('set_quest', {
            quest: quest
        });
    };

    BattleSocket.setUsername = function (clientId, username)
    {
        $log.log('BattleSocket: setUsername', clientId, sourceCode);

        BattleSocketIO.emit('client_set_username', {
            id:       clientId,
            username: username
        });
    };

    BattleSocket.upload = function (clientId, sourceCode)
    {
        $log.log('BattleSocket: upload', clientId, sourceCode);

        BattleSocketIO.emit('client_upload', {
            id:         clientId,
            sourceCode: sourceCode
        });
    };

    return BattleSocket;
});