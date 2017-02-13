(function () {
	angular.module('upp.candidate').config(config);

	config.$inject = ['$urlRouterProvider', '$stateProvider'];
	function config($urlRouterProvider, $stateProvider){

		$stateProvider
		.state("candidateTask", {
			url: '/candidate/tasks',
			views:{
				navbar: {
					templateUrl: "app/navbar/navbar.html",
					controller : 'NavbarController',
					controllerAs : 'nac'
				},
				content: {
					templateUrl: "app/candidate/candidate.html",
					controller : 'CandidateController',
					controllerAs : 'coc'
				},
				footer: {
				}
			}
		});
	}
})();