(function () {
	angular.module('upp.home').config(config);

	config.$inject = ['$urlRouterProvider', '$stateProvider'];
	function config($urlRouterProvider, $stateProvider){

		$stateProvider
		.state("home", {
			url: '/home',
			views:{
				navbar: {
					templateUrl: "app/home/navbar.html",
					controller : 'HomeController',
					controllerAs : 'hoc'
				},
				content: {
					templateUrl: "app/home/home.html",
					controller : 'HomeController',
					controllerAs : 'hoc'
				},
				footer: {
				}
			}
		});
	}
})();