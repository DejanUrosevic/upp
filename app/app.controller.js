(function(){
	angular.module('upp').controller('AppController', AppController);

	AppController.$inject = ['$http', '$scope', '$base64', '$state', 'localStorageService'];
	function AppController($http, $scope, $base64, $state, localStorageService){

		var apc = this;

		apc.login = LogIn;
		apc.variables = [];

		allVariables(); 

		function allVariables(){
			var auth = $base64.encode("kermit:kermit");
			
			$http.defaults.headers.common['Authorization'] = 'Basic ' + auth;
	 		$http.defaults.headers.common['Accept'] = 'application/json';

			$http.get('http://localhost:8080/activiti-rest/service/runtime/process-instances?processDefinitionKey=phd')
			.then(function(data){
				for(var i = 0; i < data.data.size; i++){
					$http.get('http://localhost:8080/activiti-rest/service/runtime/process-instances/'+ data.data.data[i].id+'/variables')
					.then(function(dataVariables){
						for(var j = 0; j < dataVariables.data.length; j++){
							apc.variables.push(dataVariables.data[j]);	
						}
					}, function (dataVariablesError){
						alert('Variable nisu ucitane');
					});
				}
			}, function(dataError){
				alert('Procesi nisu ucitani.');
			});
		};

		function LogIn(){
			var auth = $base64.encode(apc.username+":"+apc.password);
			
			$http.defaults.headers.common['Authorization'] = 'Basic ' + auth;
	 		$http.defaults.headers.common['Accept'] = 'application/json';


			$http.get('http://localhost:8080/activiti-rest/service/identity/users?memberOfGroup=studenti&id=' + apc.username)
			.then(function(data){
				localStorageService.set("auth", auth);
				localStorageService.set("username", apc.username);

				var postoji = false;

				if(data.data.size != 0){
					for(var i = 0; i < apc.variables.length; i++){
						if(apc.variables[i].name == "initiator" && apc.variables[i].value == apc.username){
							postoji = true;
							break;
						}
					}

					if(!postoji){
						var payload = {
										"processDefinitionKey":"phd",
										"variables": [
										      {
										        "name":"initiator",
										        "value":apc.username
										      },
										      {
										      	"name":"mentorIzbor",
										      	"value":true
										      },
									      	  {
									      	  	"name":"primedbe",
									      	  	"value":[]
									      	  }
										   ]
										}

							$http.post('http://localhost:8080/activiti-rest/service/runtime/process-instances', payload)
							.then(function(data){
								localStorageService.set("processId", data.data.id);
								$state.go('home');
							},function(data){
								alert('Proces nije uspesno startovan.');
							});
					} else {
						$state.go('home');
					}
				}

				$state.go('home');
			}, function(errorLogin){
				$state.go('login');
			});
		};
	};
})();