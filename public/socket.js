app.factory('BattleSocket', function (
      $log
    , socketFactory
    , ClientIdProvider
    , TypeProvider
) {
    $log.log('BattleSocket: initializing');

    var socketUrl = 'http://192.168.3.223:8080';
    socketUrl = 'http://192.168.178.55:8080';

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
    BattleSocket.forward('receive_username');
    BattleSocket.forward('lock_disabled');
    BattleSocket.forward('lock_enabled');
    BattleSocket.forward('disable_lock');
	BattleSocket.forward('enable_lock');
	BattleSocket.forward('clear_code');
	BattleSocket.forward('client_disconnected');
    BattleSocket.forward('full_reset');

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
        $log.log('BattleSocket: setUsername', clientId, username);

        BattleSocketIO.emit('client_set_username', {
            id:       clientId,
            username: username
        });
    };

    BattleSocket.upload = function (clientId, username, sourceCode)
    {
        $log.log('BattleSocket: upload', clientId, username, sourceCode);

        BattleSocketIO.emit('client_upload', {
            id:         clientId,
			name:       username,
            sourceCode: sourceCode
        });
    };

    return BattleSocket;
});
