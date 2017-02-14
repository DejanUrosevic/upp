(function(){
	angular.module('upp.navbar').controller('NavbarController', NavbarController);

	NavbarController.$inject = ['$http', '$state', 'localStorageService'];
	function NavbarController($http, $state, localStorageService){

		var nac = this;

		nac.mojiZadaci = mojiZadaci;
		nac.zadaciZaPreuzimanje = zadaciZaPreuzimanje;
		nac.doktorati - dostupniDoktorati;
		nac.logout = logOut;

		nac.user = localStorageService.get('username');

		$http.defaults.headers.common['Authorization'] = 'Basic ' + localStorageService.get('auth');
	 	$http.defaults.headers.common['Accept'] = 'application/json';


	 	function mojiZadaci(){
	 		$state.go('home');
	 	}

	 	function zadaciZaPreuzimanje(){
	 		$state.go('candidateTask');
	 	}

	 	function dostupniDoktorati(){
	 		$state.go('doktorati');
	 	}

	 	function logOut(){
	 		localStorageService.clearAll();
	 		$state.go('login');
	 	}
	};
})();