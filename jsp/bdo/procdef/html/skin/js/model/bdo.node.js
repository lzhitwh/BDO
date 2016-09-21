/**
 * bdo.node.js
 * @param $
 */
(function($){
	var overrideAct = {
		id: null,
		name: null,
		ok: null,
		error: null,
		
 		newActions : null,
 		actions : null,
 		endActions : null,
 		isSetSubject: false,
 		
		init: function() {
		},
		generateXml : function() {
			var actionNode = CFlow.xmlDoc.createElement( "action" );
			actionNode.setAttribute( "name", this.id );
			
			var node = CFlow.xmlDoc.createElement( this.name );
			
			var jobTracker = CFlow.xmlDoc.createElement( "job-tracker" );
			jobTracker.appendChild( CFlow.xmlDoc.createTextNode( JOBPROPERTY.jobTracker ) );
			
			var nameNode = CFlow.xmlDoc.createElement( "name-node" );
			nameNode.appendChild( CFlow.xmlDoc.createTextNode( JOBPROPERTY.nameNode ) );
			
			node.appendChild( jobTracker );
			node.appendChild( nameNode );
			
			var ok = CFlow.xmlDoc.createElement( "ok" );
			ok.setAttribute( "to", this.ok );
			
			var error = CFlow.xmlDoc.createElement( "error" );
			
			actionNode.appendChild( node );
			actionNode.appendChild( ok );
			actionNode.appendChild( error );
			
			return actionNode;
		},
		
		parseXml : function( element ) {
			this.id = element.getAttribute( "id" );
			this.name = element.getAttribute( "name" );
			this.formId = element.getAttribute( "formId" );
			this.formName = element.getAttribute( "formName" );
			
			if( this.formId ) {
				this.isSetForm = true;
			}
			if(((this.newActions && this.newActions.childList[0]) || this.actions && this.actions.childList[0]) || (this.yiBanActions && this.yiBanActions.childList[0]) || (this.endActions && this.endActions.childList[0])){
				this.isSetLocal = true;
			}
			
			if( this.form ) {
				var subforms = this.form.childList;
				for( var n in subforms ) {
					if( n == "" ) continue;
					this.isSetAuth = true;
					break;
				}
			}
			this.isSetSubject = true;
		}
	};
	BDONode = $.inherit( CFBase, overrideAct );
})(jQuery);