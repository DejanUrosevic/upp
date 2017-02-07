(function(){
	angular.module('upp.home').controller('HomeController', HomeController);

	HomeController.$inject = ['$http', '$scope', '$state', 'localStorageService'];
	function HomeController($http, $scope, $state, localStorageService){

		var hoc = this;

		hoc.zadatak = Zadatak;
		hoc.mojiZadaci = mojiZadaci;
		hoc.zadaciZaPreuzimanje = zadaciZaPreuzimanje;

		hoc.user = localStorageService.get('username');

		$http.defaults.headers.common['Authorization'] = 'Basic ' + localStorageService.get('auth');
	 	$http.defaults.headers.common['Accept'] = 'application/json';

	 	$http.get('http://localhost:8080/activiti-rest/service/runtime/tasks?assignee=' + hoc.user)
	 	.then(function(data){
	 			hoc.tasks = data.data.data;
		 	},
		 	function(data){
		 		alert('Neuspesno ucitavanje zadataka.');
	 	});

	 	function Zadatak(zadId){
	 		$state.go('task', {id:zadId});
	 	}

	 	function mojiZadaci(){
	 		$state.go('home');
	 	}

	 	function zadaciZaPreuzimanje(){
	 		$state.go('candidateTask');
	 	}
	};
})();