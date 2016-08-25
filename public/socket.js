app.factory('BattleSocket', function (
      $log
    , socketFactory
) {
    $log.log('BattleSocket: initializing');

    var socketUrl = 'http://192.168.3.223:8080';
    // socketUrl = 'http://localhost:8080';

    $log.log('BattleSocket: socket url', socketUrl);

    var BattleSocketIO = io.connect(socketUrl, { secure: true });
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
    BattleSocket.forward('camigo.response.history');




    BattleSocket.sendMessage = function (text, recipient, venueId)
    {
        $log.log('BattleSocket: sendMessage', text, recipient, venueId);

        BattleSocketIO.emit('camigo.send.message', {
            text:    text,
            type:    'text',
            user:    recipient,
            venueId: venueId
        });
    };

    return BattleSocket;
});