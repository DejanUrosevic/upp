(function () {
	angular.module('upp.candidate').config(config);

	config.$inject = ['$urlRouterProvider', '$stateProvider'];
	function config($urlRouterProvider, $stateProvider){

		$stateProvider
		.state("candidateTask", {
			url: '/candidate/tasks',
			views:{
				navbar: {
					templateUrl: "app/home/home.html",
					controller : 'HomeController',
					controllerAs : 'hoc'
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