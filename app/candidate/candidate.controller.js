(function(){
	angular.module('upp.candidate').controller('CandidateController', CandidateController);

	CandidateController.$inject = ['$http', '$scope', '$state', 'localStorageService'];
	function CandidateController($http, $scope, $state, localStorageService){

		var coc = this;

		coc.claimTask = ClaimTask; 

		coc.user = localStorageService.get('username');

		$http.defaults.headers.common['Authorization'] = 'Basic ' + localStorageService.get('auth');
	 	$http.defaults.headers.common['Accept'] = 'application/json';

	 	$http.get('http://localhost:8080/activiti-rest/service/runtime/tasks?candidateUser=' + coc.user)
	 	.then(function(data){
	 			coc.tasks = data.data.data;
		 	},
		 	function(data){
		 		alert('Neuspesno ucitavanje zadataka.');
	 	});

	 	function ClaimTask(taskId){
	 		var payload = {
	 						"assignee":coc.user
	 					  }

	 		$http.put('http://localhost:8080/activiti-rest/service/runtime/tasks/' + taskId, payload)
	 		.then(function(data){
	 			$state.go('home');
	 		}, function(errorData){
	 			alert('Preuzimanje zadatka nije uspesno.')
	 		});

	 		
	 	}
	};
})();