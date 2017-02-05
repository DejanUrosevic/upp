(function(){
	angular.module('upp').controller('AppController', AppController);

	AppController.$inject = ['$http', '$scope', '$base64', '$state', 'localStorageService'];
	function AppController($http, $scope, $base64, $state, localStorageService){

		var apc = this;

		apc.login = LogIn;

		function LogIn(){
			var auth = $base64.encode(apc.username+":"+apc.password);
			
			$http.defaults.headers.common['Authorization'] = 'Basic ' + auth;
	 		$http.defaults.headers.common['Accept'] = 'application/json';

			$http.get('http://localhost:8080/activiti-rest/service/runtime/process-instances?processDefinitionKey=doktoratProces')
			.then(function(data){
				
				localStorageService.set("auth", auth);
				localStorageService.set("username", apc.username);

				var postoji = false;

				for(var i = 0; i < data.data.size; i++){
					$http.get('http://localhost:8080/activiti-rest/service/runtime/process-instances/'+ data.data.data[i].id+'/variables')
					.then(function(dataVariables){
						/*	
						Moramo da proverimo ko je inicirao procese koji su pokrenuti, ako je inicijator isti doktorant koji se 
						loguje ne treba ponovo da pokrecemo proces nego samo da nastavimo, ako ne postoji proces koji je pokrenu
						doktorant koji se loguje onda treba da pokrenemo novi
						*/
						for(var j = 0; j < dataVariables.data.length; j++){			
							if(dataVariables.data[j].name === "initiator"){
								if(dataVariables.data[j].value === apc.username){
									postoji = true;
								}
							}
						}

						/*
						Proces ne postoji i korisnik se ulogovao kao doktorant, pokrecemo novi proces
						*/
						if(postoji == false && apc.username === "doktorant"){
							var payload = {
											"processDefinitionKey":"phdzahtev",
											"variables": [
											      {
											        "name":"initiator",
											        "value":"doktorant"
											      }
											   ]
											}

							$http.post('http://localhost:8080/activiti-rest/service/runtime/process-instances', payload)
							.then(function(data){
								$state.go('home');
							},function(data){
								alert('Proces nije uspesno startovan.');
							});
						}
					},
					function(data){
						alert('Nesto je poslo po zlu.');
					});
				}

				$state.go('home');
			},function(data){
				$state.go('login');
			});
		};

		
 		
	};
})();