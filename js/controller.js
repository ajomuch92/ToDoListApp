var app=angular.module("app",["ngRoute"]);

app.config(function($routeProvider){
            $routeProvider
            .when('/',{
                templateUrl:'templates/home.html'
            })
            .when('/persons',{
                templateUrl:'templates/person.html',
                controller:'personController'
            })
            .when('/priorities',{
            	templateUrl:'templates/priorities.html',
                controller:'priorityController'
            })
            .when('/status',{
            	templateUrl:'templates/status.html',
            	controller:'statusController'
            })
            .when('/tasks',{
            	templateUrl:'templates/tasks.html',
            	controller:'taskController'
            })
            .when('/tasks_ordered',{
            	templateUrl:'templates/tasks_ordered.html',
            	controller:'taskOrderedController'
            });
        })

app.controller('personController',['$scope','$http',function($scope,$http){
	$http.get('https://api-to-do-list.herokuapp.com/persons').then(function(response){
		$scope.list_pesons=response.data;
	});
	$scope.savePerson=function(){
		$http.post('https://api-to-do-list.herokuapp.com/persons',{name:$scope.personName}).then(function(response){
			if(response.status=200){
				$scope.personName="";
				$scope.list_pesons.push(response.data);
				$('#newPersonModal').modal('hide');
			}
		});
	}
	$scope.deletePerson=function(index, id){
		$http.delete('https://api-to-do-list.herokuapp.com/persons/'+id).then(function(response){
			if(response.status=200){
				$scope.list_pesons.splice(index,1);
			}
		});
	}
	$scope.showEditModal=function(person){
		$scope.personEditted=person;
		$('#editPersonModal').modal('show');
	}
	$scope.updatePerson=function(id){
		$http.put('https://api-to-do-list.herokuapp.com/persons/'+id,{name:$scope.personEditted.name}).then(function(response){
			if(response.status=200){
				$('#editPersonModal').modal('hide');
			}
		});
	}
	$scope.taskForPerson=function(id){
		$http.get('https://api-to-do-list.herokuapp.com/persons/'+id+'/tasks').then(function(response){
			if(response.status=200){
				$scope.tasks=response.data;
				$('#taskModal').modal('show');
			}
		});
	}
}])

app.controller('priorityController',['$scope','$http',function($scope,$http){
	$http.get('https://api-to-do-list.herokuapp.com/priority').then(function(response){
		$scope.list_priorities=response.data;
	});
	$scope.savePriority=function(){
		$http.post('https://api-to-do-list.herokuapp.com/priority',{name_priority:$scope.namePriority,value:$scope.value}).then(function(response){
			if(response.status=200){
				$scope.namePriority="";
				$scope.value=0;
				$scope.list_priorities.push(response.data);
				$('#newPriorityModal').modal('hide');
			}
		});
	}
	$scope.deletePriority=function(index, id){
		$http.delete('https://api-to-do-list.herokuapp.com/priority/'+id).then(function(response){
			if(response.status=200){
				$scope.list_priorities.splice(index,1);
			}
		});
	}
	$scope.showEditModal=function(priority){
		$scope.priorityEditted=priority;
		$('#editPriorityModal').modal('show');
	}
	$scope.updatePriority=function(id){
		$http.put('https://api-to-do-list.herokuapp.com/priority/'+id,{name_priority:$scope.priorityEditted.name_priority,value:$scope.priorityEditted.value}).then(function(response){
			if(response.status=200){
				$('#editPriorityModal').modal('hide');
			}
		});
	}
	$scope.taskForPriority=function(id){
		$http.get('https://api-to-do-list.herokuapp.com/priority/'+id+'/tasks').then(function(response){
			if(response.status=200){
				$scope.tasks=response.data;
				$('#taskModal').modal('show');
			}
		});
	}
}]);

app.controller('statusController',['$scope','$http',function($scope,$http){
	$http.get('https://api-to-do-list.herokuapp.com/status').then(function(response){
		$scope.list_status=response.data;
	});
	$scope.saveStatus=function(){
		$http.post('https://api-to-do-list.herokuapp.com/status',{status_name:$scope.nameStatus}).then(function(response){
			if(response.status=200){
				$scope.nameStatus="";
				$scope.list_status.push(response.data);
				$('#newStatusModal').modal('hide');
			}
		});
	}
	$scope.deleteStatus=function(index, id){
		$http.delete('https://api-to-do-list.herokuapp.com/status/'+id).then(function(response){
			if(response.status=200){
				$scope.list_status.splice(index,1);
			}
		});
	}
	$scope.showEditModal=function(status){
		$scope.statusEditted=status;
		$('#editStatusModal').modal('show');
	}
	$scope.updateStatus=function(id){
		$http.put('https://api-to-do-list.herokuapp.com/status/'+id,{status_name:$scope.statusEditted.status_name}).then(function(response){
			if(response.status=200){
				$('#editStatusModal').modal('hide');
			}
		});
	}
	$scope.taskForStatus=function(id){
		$http.get('https://api-to-do-list.herokuapp.com/status/'+id+'/tasks').then(function(response){
			if(response.status=200){
				$scope.tasks=response.data;
				$('#taskModal').modal('show');
			}
		});
	}
}]);

app.controller('taskController',['$scope','$http',function($scope,$http){
	$http.get('https://api-to-do-list.herokuapp.com/tasks').then(function(response){
		$scope.list_tasks=response.data;
	});
	$http.get('https://api-to-do-list.herokuapp.com/persons').then(function(response){
		$scope.list_pesons=response.data;
	});
	$http.get('https://api-to-do-list.herokuapp.com/priority').then(function(response){
		$scope.list_priorities=response.data;
	});
	$http.get('https://api-to-do-list.herokuapp.com/status').then(function(response){
		$scope.list_status=response.data;
	});
	$scope.saveTask=function(){
		var task={
			name:$scope.taskName,
			date:$scope.taskDate,
			person:{id:$scope.taskPerson},
			status:{id:$scope.taskStatus},
			priority:{id:$scope.taskPriority}
		}
		$http.post('https://api-to-do-list.herokuapp.com/tasks',task).then(function(response){
			if(response.status=200){
				$scope.taskName="";
				$scope.taskDate="";
				$scope.taskPerson="";
				$scope.taskStatus="";
				$scope.taskPriority="";
				$scope.list_tasks.push(response.data);
				$('#newTaskModal').modal('hide');
			}
		});
	}
	$scope.deleteTask=function(index, id){
		$http.delete('https://api-to-do-list.herokuapp.com/tasks/'+id).then(function(response){
			if(response.status=200){
				$scope.list_tasks.splice(index,1);
			}
		});
	}
	$scope.showEditModal=function(index, task){
		$scope.i=index;
		$scope.taskEditted=task;
		$scope.taskEdittedName=task.name;
		$scope.taskEdittedDate=new Date(task.date);  
		$('#editTaskModal').modal('show');
	}
	$scope.updateTask=function(id){
		var task={
			name:$scope.taskEdittedName,
			date:$scope.taskEdittedDate,
			person:{id:$scope.taskEditted.person.id},
			status:{id:$scope.taskEditted.status.id},
			priority:{id:$scope.taskEditted.priority.id}
		}
		$http.put('https://api-to-do-list.herokuapp.com/tasks/'+id,task).then(function(response){
			if(response.status=200){
				$scope.list_tasks[$scope.i]=response.data;
				$('#editTaskModal').modal('hide');
			}
		});
	}

	$scope.verifyTask=function(task){
		if(task.id==3 || task.id==4){
			return true;
		}
		return false;
	}
}]);

app.controller('taskOrderedController',['$scope','$http',function($scope,$http){
	$http.get('https://api-to-do-list.herokuapp.com/tasks/ordered').then(function(response){
		$scope.list_task=response.data;
	});
}]);