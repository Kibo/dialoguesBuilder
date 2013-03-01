angular.module('DAOModule', [], function($routeProvider, $locationProvider) {
	
		$routeProvider.when('/builder', { templateUrl: 'tpl/builder.html', controller: 'BuilderController' }); 
		$routeProvider.when('/export', { templateUrl: 'tpl/export.html', controller: 'ExportController' }); 
		$routeProvider.when('/import', { templateUrl: 'tpl/import.html', controller: 'ImportController' }); 
		$routeProvider.when('/documentation', { templateUrl: 'tpl/documentation.html', controller: 'DocumentationController' }); 
		$routeProvider.when('/contact', { templateUrl: 'tpl/contact.html', controller: 'ContactController' });
		
		$routeProvider.otherwise({redirectTo:'/builder'});
		
		//$locationProvider.html5Mode(true);		
	})
	.factory('dao', function() {    
		return ChatBuilderDAO.init();
	});

function BuilderController($scope, $routeParams, dao){
		
	//--ACTORS------------------------
	$scope.actors = dao.getActors();	
	
	$scope.addActor = function() {		
		dao.inserOrUpdateActor({
			id:parseInt(this.actor.id), 
			name:this.actor.name
			});	
			
		update();
	};
	
	$scope.editActor = function( id ) {
		$scope.actor =  dao.getActor(id);
	};
	
	$scope.removeActor = function( id ) {
		dao.removeActor(id);	
		update();
	};
	
	//--DIALOGS--------------------------
	$scope.dialogues = dao.utils.selectDialogues( dao.getDialogues(), false );
	
	$scope.editDialogue = function( id ) {		
		$scope.dialogue =  dao.getDialogue(id);
	};
		
	$scope.removeDialogue = function( id ) {
		dao.removeDialogue(id);	
		update();
	};
		
	$scope.addDialogue = function() {	
		
		dao.inserOrUpdateDialog({
			id: parseInt(this.dialogue.id),
			parent: parseInt(this.dialogue.parent),
			isChoice: false,
			actor: parseInt(this.dialogue.actor),
			conversant: parseInt(this.dialogue.conversant),			
			menuText: this.dialogue.menuText || "",
			dialogueText: this.dialogue.dialogueText || "",
			conditionsString: this.dialogue.conditionsString || "",
			codeBefore: this.dialogue.codeBefore || "",
			codeAfter: this.dialogue.codeAfter || "",
			outgoingLinks: dao.utils.parseOutgoingLinks( this.dialogue.outgoingLinks)			
			});	
		
		update();		
	};	
	
	//--CHOISES--------------------------------------------
	$scope.choices = dao.utils.selectDialogues( dao.getDialogues(), true);
	
	$scope.editChoice = function( id ) {
		$scope.choice =  dao.getDialogue(id);
	};
	
	$scope.removeChoice = function( id ) {
		dao.removeDialogue(id);	
		update();
	};
	
	$scope.addChoice = function() {					
		dao.inserOrUpdateDialog({
			id: parseInt(this.choice.id),
			parent: parseInt(this.choice.parent),
			isChoice: true,					
			conditionsString: this.choice.conditionsString,
			codeBefore: this.choice.codeBefore,
			codeAfter: this.choice.codeAfter,
			outgoingLinks: dao.utils.parseOutgoingLinks( this.choice.outgoingLinks )
			});	
		
		update();
	};	
	
	//--DIAGRAM--------------------------------
	$scope.drawDiagram = function(){
		var data = new google.visualization.DataTable();
        data.addColumn('string', 'ID');
        data.addColumn('string', 'PARENT');
        data.addRows( getDiagramData() );
        var chart = new google.visualization.OrgChart(document.getElementById('chartDiagram'));
        chart.draw(data, {allowHtml:true});				   
	};	
	
	var getDiagramData = function(){		
		return dao.utils.getDiagramData( dao.getData() );
	};
	
	//--GENERAL---------------------------------
	$scope.clear = function() {
		dao.clearData();
		update();
	};
	
	var update = function(){
		$scope.actors = dao.getActors();
		$scope.dialogues = dao.utils.selectDialogues( dao.getDialogues(), false );
		$scope.choices = dao.utils.selectDialogues( dao.getDialogues(), true);
		$scope.drawDiagram();
	};	
};

function ImportController($scope, $routeParams, dao){	
	
	/*
	 * Save JSON to localstorage
	 */
	$scope.save = function( elm ){		 	
         var f = elm.files[0];                                                                  
         if (f) {
              var r = new FileReader();                          
              r.onload = function(e) { 
            	 dao.setData( JSON.parse( e.target.result));
            	 window.alert("Import completed.");                           
              };                           
              r.readAsText(f);
          }       
	};
};

function ExportController($scope, $routeParams, dao){	
	$scope.source = JSON.stringify(dao.getData(), null, "\t");	
};

function DocumentationController($scope, $routeParams){
};

function ContactController($scope, $routeParams){	
};