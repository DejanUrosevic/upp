(function(){
	angular.module('upp.task').controller('TaskController', TaskController);

	TaskController.$inject = ['$http', '$scope', '$state', 'localStorageService', '$stateParams'];
	function TaskController($http, $scope, $state, localStorageService, $stateParams){

		var tac = this;

		tac.user = localStorageService.get('username');
		tac.finishTask = FinishTask;

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

			var payload = {"taskId":tac.taskId,
						   "properties": list
					      };

			$http.post('http://localhost:8080/activiti-rest/service/form/form-data', payload)
			.then(function(data){
				$state.go('home');
			});
		}	
	};
})();