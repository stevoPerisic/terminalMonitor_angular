// var CCP = CCP || {};

// console.log("Hello from CCP! Let's start monitoring....");

// CCP.reportURL = "http://qa1-www.mypeoplenet.com/clockmessages.cfm?";
// CCP.terminalID = '4311340001';
// CCP.dataViewOpts = {
// 	punches: 'BU',
// 	logs: 'SBU',
// 	messages: ''
// };


(function(){
	'use strict';

	console.log("Hello from CCP! Let's start monitoring....");

	// Declare app level module which depends on filters, and service
	var CCP_monitor = angular.module('CCP_monitor', [
		'ngRoute',
		'CCP_monitorControllers'
	]);

	CCP_monitor.config(['$routeProvider',
		function($routeProvider){
			$routeProvider.
				when('/terminal/:terminalId', {
					templateUrl: 'partials/terminal.html',
					controller: 'TerminalDetailCtrl'
				}).
				otherwise({
					redirectTo: '/terminal/4311340001'
				});
		}
	]);
})();