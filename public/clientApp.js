/* global angular */
var modulesToLoad = [
    , 'angular-clipboard'            //
    , 'btford.socket-io'             //
    , 'flock.bootstrap.material'     //
    , 'LocalStorageModule'           //
    , 'ngIdle'                       //
    , 'pascalprecht.translate'       //
    , 'ui.ace'                       //
];

var app = angular.module('toolboxHtmlBattleClient', modulesToLoad).config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['**']);
});