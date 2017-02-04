(function () {
	angular.module('upp').config(config);

	config.$inject = ['$urlRouterProvider', '$stateProvider'];
	function config($urlRouterProvider, $stateProvider){
		$urlRouterProvider.otherwise("/login");

		$stateProvider
		.state("login", {
			url: '/login',
			views:{
				navbar: {
				},
				content: {
					templateUrl: "app/content.html",
					controller : 'AppController',
					controllerAs : 'apc'
				},
				footer: {
				}
			}
		});
	}
})();