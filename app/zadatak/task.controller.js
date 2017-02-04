(function(){
	angular.module('upp.task').controller('TaskController', TaskController);

	TaskController.$inject = ['$http', '$scope', '$state', 'localStorageService'];
	function TaskController($http, $scope, $state, localStorageService){

		var tac = this;

		tac.user = localStorageService.get('username');

		$http.defaults.headers.common['Authorization'] = 'Basic ' + localStorageService.get('auth');
	 	$http.defaults.headers.common['Accept'] = 'application/json';

	 	
	};
})();