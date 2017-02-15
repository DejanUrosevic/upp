(function(){
	angular.module('upp.doktorati').controller('DoktoratiController', DoktoratiController);

	DoktoratiController.$inject = ['$http', '$state', 'localStorageService'];
	function DoktoratiController($http, $state, localStorageService){

		var doc = this;

		$http.defaults.headers.common['Authorization'] = 'Basic ' + localStorageService.get('auth');
	 	$http.defaults.headers.common['Accept'] = 'application/json';

		doc.listaDoktorata = [];
		doc.primedba = Primedbe;
		doc.priloziPrimedbu = PriloziPrimedbu;

		Doktorati();

		function Doktorati(){
			$http.get('http://localhost:8080/activiti-rest/service/runtime/process-instances?processDefinitionKey=phd')
			.then(function(data){
				for(var i = 0; i < data.data.size; i++){
					$http.get('http://localhost:8080/activiti-rest/service/runtime/process-instances/'+ data.data.data[i].id+'/variables')
					.then(function(dataVariables){
						for(var j = 0; j < dataVariables.data.length; j++){
							if(dataVariables.data[j].name == "ime"){
								doc.ime = dataVariables.data[j].value;
							} else if (dataVariables.data[j].name == "prezime"){
								doc.prezime = dataVariables.data[j].value;
							} else if (dataVariables.data[j].name == "temadd"){
								doc.tema = dataVariables.data[j].value;
							} else if (dataVariables.data[j].name == "ciljIstrazivanja"){
								doc.ciljIstrazivanja = dataVariables.data[j].value;
							} else if (dataVariables.data[j].name == "programIstrazivanja"){
								doc.programIstrazivanja = dataVariables.data[j].value;
							} else if (dataVariables.data[j].name == "javniUvid"){
								doc.javniUvid = dataVariables.data[j].value;
							} else if (dataVariables.data[j].name == "idProcess"){
								doc.idProcess = dataVariables.data[j].value;
							}
						}

						if(doc.javniUvid == true){
							var object = {"idProcess":doc.idProcess,
  										  "doktorant":doc.ime + " " + doc.prezime,
  										  "tema":doc.tema,
  										  "ciljIstrazivanja":doc.ciljIstrazivanja,
  										  "programIstrazivanja":doc.programIstrazivanja
										 };
							doc.listaDoktorata.push(object);
						}
					}, function (dataVariablesError){
						alert('Variable ne postoji');
					});
				}
			}, function(dataError){
				alert('Procesi nisu ucitani.');
			});
		};

		function Primedbe(id){
			$state.go('doktorat', {id:id});
		}

		function PriloziPrimedbu(){

		}

	};
})();