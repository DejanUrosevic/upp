(function () {
	angular.module('upp.doktorati').config(config);

	config.$inject = ['$urlRouterProvider', '$stateProvider'];
	function config($urlRouterProvider, $stateProvider){

		$stateProvider
		.state("doktorati", {
			url: '/doktorati',
			views:{
				navbar: {
					templateUrl: "app/navbar/navbar.html",
					controller : 'NavbarController',
					controllerAs : 'nac'
				},
				content: {
					templateUrl: "app/doktorati/doktorati.html",
					controller : 'DoktoratiController',
					controllerAs : 'doc'
				},
				footer: {
				}
			}
		})
		.state("doktorat",{
			url: '/doktorat/:id',
			views:{
				navbar: {
				},
				content: {
					templateUrl: "app/doktorati/doktorat.html",
					controller : 'DoktoratiController',
					controllerAs : 'doc'
				},
				footer: {
				}
			}
		});
	}
})();