/* global angular */
var modulesToLoad = [
    , 'angular-clipboard'            //
    , 'btford.socket-io'             //
    , 'flock.bootstrap.material'     //
    , 'LocalStorageModule'           //
    , 'ngIdle'                       //
    , 'pascalprecht.translate'       //
];

var app = angular.module('toolboxHtmlBattleClient', modulesToLoad);