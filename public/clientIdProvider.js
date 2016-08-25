/* global app, angular */
app.factory('ClientIdProvider', function (
      $log
    , $rootScope
    , localStorageService
)
{
    var ClientIdProvider = {
        clientId: null,
        key:      '56c1cf01b0eac50891512c59511d4b2aca506083'
    };

    ClientIdProvider.getClientId = function ()
    {
        if (ClientIdProvider.clientId == null)
        {
            $log.log('ClientIdProvider: getClientId', ClientIdProvider.clientId);

            var newClientId = ClientIdProvider.getNewClientId();

            ClientIdProvider.setClientId(newClientId);
        }

        $log.log('ClientIdProvider: getClientId', ClientIdProvider.clientId);

        return ClientIdProvider.clientId;
    };

    ClientIdProvider.getNewClientId = function ()
    {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };

    ClientIdProvider.init = function ()
    {
        var settingsFromStorage = localStorageService.get(ClientIdProvider.key);

        if (settingsFromStorage)
        {
            ClientIdProvider.clientId = settingsFromStorage;
        }
    };

    ClientIdProvider.persist = function ()
    {
        localStorageService.set(ClientIdProvider.key, ClientIdProvider.clientId);

    };

    ClientIdProvider.setClientId = function (clientId)
    {
        ClientIdProvider.clientId = clientId;

        ClientIdProvider.persist();
    };

    ClientIdProvider.init();

    return ClientIdProvider;
});