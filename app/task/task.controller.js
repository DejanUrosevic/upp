(function(){
	angular.module('upp.task').controller('TaskController', TaskController);

	TaskController.$inject = ['$http', '$scope', '$state', 'localStorageService', '$stateParams'];
	function TaskController($http, $scope, $state, localStorageService, $stateParams){

		var tac = this;

		tac.user = localStorageService.get('username');
		tac.finishTask = FinishTask;

		tac.odabirMentora = false;
		tac.komisijaPodobnost = false;	
		tac.komisijaOcena = false;	

		OdabirMentora();

		KomisijaPodobnost();

		KomisijaOcena();

		$http.defaults.headers.common['Authorization'] = 'Basic ' + localStorageService.get('auth');
	 	$http.defaults.headers.common['Accept'] = 'application/json';

	 	if(!angular.equals({}, $stateParams)){
			tac.taskId = $stateParams.id;
			$http.get('http://localhost:8080/activiti-rest/service/form/form-data?taskId=' + tac.taskId)
			.then(function(data){
				tac.formProperties = data.data.formProperties;
			});
		}

		function FinishTask(){
			var list = [];

			for(var i = 0; i < tac.formProperties.length; i++){
				if(tac.formProperties[i].writable){
					if(tac.formProperties[i].type == 'date'){
						//var datum = {tac.formProperties[i].value | date : "MM-dd-yyyy"};
						list.push({"id":tac.formProperties[i].id, "value":datum});
					}

					

					list.push({"id":tac.formProperties[i].id, "value":tac.formProperties[i].value});
				}
			}

			if(tac.odabirMentora){
				var ponistavanje = {"name":"mentorIzbor",
									"type":"boolean",
									"value":false};

				$http.put('http://localhost:8080/activiti-rest/service/runtime/process-instances/' + localStorageService.get("processId") + '/variables/mentorIzbor', ponistavanje)
				.then(function(data){
					tac.odabirMentora = false;
				}, function(errorData){
					alert('Nesto je poslo po zlu.');
				});
			}

			if(tac.komisijaPodobnost){
				var ponistavanje = {"name":"komisijaPodobnost",
									"type":"boolean",
									"value":false};

				$http.put('http://localhost:8080/activiti-rest/service/runtime/process-instances/' + localStorageService.get("processId") + '/variables/komisijaPodobnost', ponistavanje)
				.then(function(data){
					tac.komisijaPodobnost = false;
				}, function(errorData){
					alert('Nesto je poslo po zlu.');
				});
			}

			if(tac.komisijaOcena){
				var ponistavanje = {"name":"komisijaOcena",
									"type":"boolean",
									"value":false};

				$http.put('http://localhost:8080/activiti-rest/service/runtime/process-instances/' + localStorageService.get("processId") + '/variables/komisijaOcena', ponistavanje)
				.then(function(data){
					tac.komisijaOcena = false;
				}, function(errorData){
					alert('Nesto je poslo po zlu.');
				});
			}

			var payload = {"taskId":tac.taskId,
						   "properties": list
					      };

			$http.post('http://localhost:8080/activiti-rest/service/form/form-data', payload)
			.then(function(data){
				$state.go('home');
			});
		};

		function OdabirMentora(){
			$http.get('http://localhost:8080/activiti-rest/service/runtime/process-instances/'+ localStorageService.get("processId") +'/variables/mentorIzbor')
			.then(function(data){
				if(data.data.value == true){
					tac.odabirMentora = true;	
					$http.get('http:/localhost:8080/activiti-rest/service/identity/users?memberOfGroup=ftn')
					.then(function(dataProf){
						tac.profesori = dataProf.data.data;
					}, function(errorDataProf){
						alert('Profesori nisu ucitani.');
					});
				}
			}, function(errorData){
				tac.odabirMentora = false;
			});
		};

		function KomisijaPodobnost(){
			$http.get('http://localhost:8080/activiti-rest/service/runtime/process-instances/'+ localStorageService.get("processId") +'/variables/komisijaPodobnost')
			.then(function(data){
				if(data.data.value == true){
					tac.komisijaPodobnost = true;
					
					$http.get('http:/localhost:8080/activiti-rest/service/identity/users?memberOfGroup=ftn')
					.then(function(dataProf){
						tac.profesori = dataProf.data.data;
					}, function(errorDataProf){
						alert('Profesori nisu ucitani.');
					});

					$http.get('http:/localhost:8080/activiti-rest/service/identity/users?memberOfGroup=ostali')
					.then(function(dataProfOstali){
						tac.ostali = dataProfOstali.data.data;
					}, function(errorDataProfOstali){
						alert('Profesori nisu ucitani.');
					});
				}
			}, function(errorData){
				tac.komisijaPodobnost = false;				
			});
		};	

		function KomisijaOcena(){
			$http.get('http://localhost:8080/activiti-rest/service/runtime/process-instances/'+ localStorageService.get("processId") +'/variables/komisijaOcena')
			.then(function(data){
				if(data.data.value == true){
					tac.komisijaOcena = true;

					$http.get('http:/localhost:8080/activiti-rest/service/identity/users?memberOfGroup=ftn')
					.then(function(dataProf){
						tac.profesori = dataProf.data.data;
					}, function(errorDataProf){
						alert('Profesori nisu ucitani.');
					});						
				}
			}, function(errorData){
				tac.komisijaOcena = false;				
			});
		};
	};
})();