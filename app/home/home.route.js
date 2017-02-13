(function () {
	angular.module('upp.home').config(config);

	config.$inject = ['$urlRouterProvider', '$stateProvider'];
	function config($urlRouterProvider, $stateProvider){

		$stateProvider
		.state("home", {
			url: '/home',
			views:{
				navbar: {
					templateUrl: "app/navbar/navbar.html",
					controller : 'NavbarController',
					controllerAs : 'nac'
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