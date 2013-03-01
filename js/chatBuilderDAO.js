/**
* Data access object for ChatBuilder.
* For storing data it use HTML Local Storage
* 
* @class ChatBuilderDAO
* @author Tomas Jurman (tomasjurman@gmail.com)
*/
var s,
ChatBuilderDAO = {

  settings: {
    DATA_KEY: "cz.kibo.chatbuilder",
    BOOT_DATA:{"actors":[{"id":10,"name":"John"},{"id":20,"name":"Emily"}],"dialogues":[{"id":10,"parent":null,"isChoice":false,"actor":10,"conversant":20,"menuText":"","dialogueText":"Where is the cave?","conditionsString":"","codeBefore":"","codeAfter":"","outgoingLinks":[20]},{"id":20,"parent":10,"isChoice":false,"actor":20,"conversant":10,"menuText":"","dialogueText":"Outside the village.","conditionsString":"","codeBefore":"","codeAfter":"","outgoingLinks":[30]},{"id":30,"parent":20,"isChoice":true,"outgoingLinks":[40,50]},{"id":40,"parent":30,"isChoice":false,"actor":10,"conversant":20,"menuText":"Ask about cave.","dialogueText":"What do you know about the cave?","conditionsString":"","codeBefore":"","codeAfter":"","outgoingLinks":[41]},{"id":50,"parent":30,"isChoice":false,"actor":10,"conversant":20,"menuText":"Leave","dialogueText":"Good by.","conditionsString":"","codeBefore":"","codeAfter":"","outgoingLinks":[]},{"id":41,"parent":40,"isChoice":false,"actor":20,"conversant":10,"menuText":"","dialogueText":"People is losing there.","conditionsString":"","codeBefore":"","codeAfter":"","outgoingLinks":[30]}]},
    PURE_DATA:{"actors":[{"id":10,"name":"John"},{"id":20,"name":"Emily"}],"dialogues":[]},
    DIALOGUES_COLLECTION_NAME:"dialogues",
	ACTORS_COLLECTION_NAME:"actors"
  },

  init: function() {   
    s = this.settings;  
    this.boot();
    return this;
  },
      
  /**
   * Insert or update Actor object
   * If object with ID exists, it will be rewrite.
   *
   * @method inserOrUpdateActor 
   * @param {Object} artist
   */
  inserOrUpdateActor:function( actor ){
	  return this.inserOrUpdate(this.settings.ACTORS_COLLECTION_NAME, actor);	  	   
  },
    
  /**
   * Get Actor object
   *
   * @method getActor 
   * @param {Number} id
   * @return {Object} actor
   */
  getActor:function( id ){
	  return this.getObj(this.settings.ACTORS_COLLECTION_NAME, id);	  
  },
     
  /**
   * Remove Actor object
   *
   * @method removeActor 
   * @param {Number} id
   * @return {Object} removed actor or null
   */
  removeActor:function( id ){
	  return this.removeObj( this.settings.ACTORS_COLLECTION_NAME, id);		  	 		 
  },
      
  /**
   * Get list of actors
   *
   * @method getActors 
   * @return {Array} actors
   */
  getActors:function(){
	return this.getData().actors;  
  },
  
  /**
   * Get list of dialogues
   *
   * @method getDialogues 
   * @return {Array} dialogues
   */
  getDialogues:function(){
	  return this.getData().dialogues; 
  },
    
  /**
   * Insert or update Dialog object
   * If object with ID exists, it will be rewrite.
   *
   * @method inserOrRemoveDialog
   * @param {Object} dialog
   */
  inserOrUpdateDialog:function( dialog ){
	 return this.inserOrUpdate(this.settings.DIALOGUES_COLLECTION_NAME, dialog);	  	  	
  },
  
  /**
   * Get Dialogue object
   *
   * @method getDialogue
   * @param {Number} id
   * @return {Object} dialogue
   */
  getDialogue:function( id ){
	  return this.getObj(this.settings.DIALOGUES_COLLECTION_NAME, id);
  },
  
  /**
   * Remove Dialog object
   *
   * @method removeDialog 
   * @param {Number} id
   * @return {Object} removed dialog or null
   * 
   * @see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/splice
   */
  removeDialogue:function( id ){
	  return this.removeObj( this.settings.DIALOGUES_COLLECTION_NAME, id);
  },
        
  //--GENERAL METHODS-------------------------------------------
  
  /**
   * Checks the browser to see if local storage is supported
   *
   * @method isLocalStorageSupported
   * @return {Boolean} true or false
   */
   isLocalStorageSupported:function(){	  
 	  return ('localStorage' in window && window['localStorage'] !== null); 	
   },
   
   /**
    * Get data object from LocalStorage
    *
    * @method getData 
    * @return {Object} data
    */
   getData:function(){	  	  
 	  return JSON.parse( localStorage.getItem( this.settings.DATA_KEY ));
   },
   
   /**
    * Insert data object to LocalStorage
    *
    * @method setData
    * @param {Object} data
    */
   setData:function( data ){	 
 	  localStorage.setItem( this.settings.DATA_KEY, JSON.stringify( data ));
   },
   
   /**
    * Clear storage and insert boot data
    *
    * @method setData
    * @param {Object} data   
    */
   clearData:function(){ 	 
 	  localStorage.removeItem( this.settings.DATA_KEY );
 	  this.setData( this.settings.PURE_DATA );	 
   },
  
  /*
   * Insert or update object to array
   * If object with ID exists, it will be rewrite.
   *  
   * @param {String} collectionName
   * @param {Object} object
   */
  inserOrUpdate:function( collectionName, obj){
	  var data = this.getData();
	  var index = this.getIndexOf(collectionName, obj.id);	
	  if(index != null){		  
		  //Update
		  data[collectionName][index] = obj;
	  }else{		  
		  //Insert
		  data[collectionName].push(obj);  
	  }
	  this.setData(data);	
  },
  
  /*
   * Index of array
   * 
   * @param {String} collectionName
   * @param {Number} objectId
   * @return {Number} index or null 
   */
  getIndexOf:function(collectionName, objectId){	 
	  var data = this.getData();
	  for(var idx = 0; idx < data[collectionName].length; idx++ ){
		  if( data[collectionName][idx].id == objectId ){			  		
			  return idx;			  						
		  }
	  }
	  
	  return null;			  
  } ,
  
  /*
   * Get Object from collection
   * 
   * @param {String} collectionName
   * @param {Number} objectId
   * @return {Object} object or null 
   */
  getObj:function( collectionName, objectId ){
	  var index = this.getIndexOf(collectionName, objectId);
	  if(index != null){
		  var data = this.getData();
		  return data[collectionName][index];	
	  }	  	
	  return null;	
  },
  
  /*
   * Remove object from collection
   *  
   * @param {String} collectionName
   * @param {Number} objectId
   * @return {Object} removed actor or null
   * 
   * @see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/splice
   */
  removeObj:function( collectionName, objectId ){
	  var index = this.getIndexOf(collectionName, objectId);
	  if(index != null){
		  var data = this.getData();
		  var obj = data[collectionName].splice(index, 1)[0];
		  this.setData(data);
		  return obj;			  
	  }
	  
	  return null;
  },
  
  /*
   * Create empty data object if not exists   
   *
   * @throw {Error} localStorage is not supported 
   */
  boot:function(){
	  if(!this.isLocalStorageSupported()){
 		  throw new Error("LocalStorage is not supported.");
 	  }
	  
	  if (!this.getData()){
		  this.setData( this.settings.BOOT_DATA );	
	  }	  
  },  
};

/**
* Helper method for ChatBuilderDAO
*/
ChatBuilderDAO.utils = {
		
	/**
	 * Convert comma separated string to array of integer 
	 * @param {String} commaSeparatedString
	 * @return {Array} [number, number,...]
	 */
	 parseOutgoingLinks:function( commaSeparatedString ){		
					
		if(!commaSeparatedString){
			return [];
		}
		
		if(typeof commaSeparatedString  === "object"){
			return commaSeparatedString;
		}
				   
		var links = [];
		var outgoingLinks = commaSeparatedString.split(',');			
		for(var idx=0; idx < outgoingLinks.length; idx++){
			links.push(parseInt(outgoingLinks[idx]));
		}
		return links;
	},	
	
	/**
	 * Select dialogues to the condition isChoice
	 *  
	 * @param {Array} dialogues
	 * @param {boolean} isChoice
	 * @return {Array} selectedDialogues
	 */
	selectDialogues:function( dialogues, isChoice ){
		var selected = [];
		for( var idx=0; idx < dialogues.length; idx++ ){
			if( dialogues[idx].isChoice == isChoice ){
				selected.push( dialogues[idx] );
			}			
		}		
		return selected;
	},
	
	/**
	 * It creates data structure for Google chart
	 *  
	 * @param {Object} data
	 * @return {Array} diagramData
	 */
	getDiagramData:function( data ){		
		var diagramData = [];
		for(var idx=0; idx < data.dialogues.length; idx++){
			diagramData.push([					
					{v: data.dialogues[idx].id.toString(), f: this.getLabelOfDescription( data.dialogues[idx] )},
					data.dialogues[idx].parent ? data.dialogues[idx].parent.toString() : '']);
		}
		return diagramData;	
	},
	
	/*
	 * Create label for dialog
	 *  
	 * @param {Object} dialog
	 * @return {String} label
	 */
	getLabelOfDescription:function( dialog ){		
		if(dialog.isChoice){
			return '#' + dialog.id + ' Choice' +
			'<br>Link: (' + dialog.outgoingLinks + ')' + 
			(dialog.conditionsString ? ', C': '') + 
			(dialog.codeBefore ? ', B': '') + 
			(dialog.codeAfter ? ', A': '');
			
		}else{
			return '#' + dialog.id + ' Dialogue' +
			'<br>Actor: ' + ChatBuilderDAO.getActor(dialog.actor).name + 
			'<br><b>' + dialog.menuText + '</b>' + 
			'<br><p>' + dialog.dialogueText + '</p>' + 
			'<br>' + (dialog.outgoingLinks[0] ? 'Link: (' + dialog.outgoingLinks[0] + ')' : '' ) + 
				(dialog.conditionsString ? ', C': '') + 
				(dialog.codeBefore ? ', B': '') + 
				(dialog.codeAfter ? ', A': '');
		}		
	}
};
