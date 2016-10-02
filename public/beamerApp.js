/* global angular */
var modulesToLoad = [
    , 'angular-clipboard'            //
    , 'btford.socket-io'             //
    , 'flock.bootstrap.material'     //
    , 'LocalStorageModule'           //
    , 'ngIdle'                       //
    , 'pascalprecht.translate'       //
    , 'ngSanitize'
];

var app = angular.module('toolboxHtmlBattleBeamer', modulesToLoad).config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['**']);
});
