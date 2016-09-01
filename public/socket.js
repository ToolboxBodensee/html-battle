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