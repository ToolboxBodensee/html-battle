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

    $scope.admin          = false;
    $scope.clientId       = ClientIdProvider.getClientId();
    $scope.columnClass    = '-12';
    $scope.connected      = false;
    $scope.quest          = '';
    $scope.rowsAndColumns = 1;
    $scope.sourceCodes    = {};
    $scope.userCount      = 0;

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

    $scope.$on('socket:receive_quest', function (event, data) {
        $log.log('BattleSocket: receive_quest', event, data);

        $scope.quest = data.quest;
    });

    $scope.$on('socket:receive_username', function (event, data) {
        $log.log('BattleSocket: receive_username', event, data);
		var user = $scope.sourceCodes[data.id];
		if (user) {
			user.name = data.username;
		}
    });

    $scope.$on('socket:receive_upload', function (event, data) {
        $log.log('BattleSocket: receive_upload', event, data);

        var iFrameSourceCode =  'data:text/html;charset=utf-8,' + encodeURIComponent(data.sourceCode);

        $log.log('BattleSocket: iFrameSourceCode', iFrameSourceCode);

		if (!$scope.sourceCodes[data.id]) {
			// TODO: create a 'createInitialSource' method
			$scope.sourceCodes[data.id] = {};
		}
		if (data.name) {
			$scope.sourceCodes[data.id].name = data.name;
		}
		if (data.sourceCode) {
			$scope.sourceCodes[data.id].sourceCode = iFrameSourceCode;
		}

        $scope.userCount = Object.keys($scope.sourceCodes).length;
        var rowsAndColumns = 1;

        while (rowsAndColumns * rowsAndColumns < $scope.userCount)
        {
            ++rowsAndColumns;
        }

        $scope.rowsAndColumns = rowsAndColumns;
        $scope.columnClass    = '-' + Math.ceil(12 / rowsAndColumns);

        $scope.fixHeight();
    });

    /**
     * #################################################################################################################
     * ### Public scope methods                                                                                      ###
     * #################################################################################################################
     */

    $scope.clearCodeButtonPressed = function ()
    {
        if (confirm('Sicher, dass du die Code-Felder aller Nutzer leeren möchtest?'))
        {
            BattleSocket.clearCode();
        }
    };

    $scope.disableLockButtonPressed = function ()
    {
        BattleSocket.disableLock();
    };

    $scope.enableLockButtonPressed = function ()
    {
        BattleSocket.enableLock();
    };

    $scope.fixHeight = function ()
    {
        console.log('fixHeight', $scope.rowsAndColumns);

        var windowHeight  = $(window).height();
        var navbarHeight  = $('.navbar').height();
        var previewHeight =  windowHeight - (navbarHeight * ($scope.admin ? 2 : 1));
        var iframe        = (previewHeight / ($scope.userCount < 3 ? 1 : $scope.rowsAndColumns)) - navbarHeight;

        $('iframe').height(iframe);
    };

    $scope.fullResetButtonPressed = function ()
    {
        if (confirm('Sicher, dass du alles zurücksetzen möchtest?'))
        {
            BattleSocket.fullReset();
        }
    };

    $scope.headerClicked = function ()
    {
        $scope.admin = !$scope.admin;

        $scope.fixHeight();
    };

    $scope.init = function ()
    {
        $log.log('AppController: ready');


        $scope.fixHeight();
    };

    $scope.setQuestButtonPressed = function ()
    {
        var newQuest = prompt('Bitte gib die neue Aufgabe an.', '');

        if (newQuest)
        {
            BattleSocket.setQuest(newQuest);
        }
    };

    $scope.addPoints = function (clientId)
    {
        var points = prompt('Bitte gib die hinzuzufügenden Punkte an.', '10');

        if (points)
        {
			points = Math.max(0, parseFloat(points));
			if (!$scope.sourceCodes[clientId].points) {
				$scope.sourceCodes[clientId].points = 0;
			}
			$scope.sourceCodes[clientId].points += points;
            BattleSocket.addPoints(clientId, points);
        }
    };

    /**
     * #################################################################################################################
     * ### After initialization                                                                                      ###
     * #################################################################################################################
     */

    $scope.init();
});
