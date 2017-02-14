(function () {
	angular.module('upp.task').config(config);

	config.$inject = ['$urlRouterProvider', '$stateProvider'];
	function config($urlRouterProvider, $stateProvider){

		$stateProvider
		.state("task", {
			url: '/process/:processId/task/:id',
			views:{
				navbar: {
				},
				content: {
					templateUrl: "app/task/task.html",
					controller : 'TaskController',
					controllerAs : 'tac'
				},
				footer: {
				}
			}
		});
	}
})();