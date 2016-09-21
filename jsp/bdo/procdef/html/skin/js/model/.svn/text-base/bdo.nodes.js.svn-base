/**
 * bdo.nodes.js
 * @param $
 */
(function($){
	var overrideActs = {
		childList : null,
		init : function(){
			this.childList = {};
		},
		generateXml : function(root) {
			var startNode = CFlow.xmlDoc.createElement( "start" );
			startNode.setAttribute( "to", this.childList["start"].ok );
			root.appendChild( startNode );
			
			for (var i in this.childList) {
				var childElement = this.childList[i];
				if( childElement.widget.id == "start" || childElement.widget.id == "end" )
					continue;
				
				root.appendChild(childElement.generateXml());
			}
			
			var endNode = CFlow.xmlDoc.createElement( "end" );
			endNode.setAttribute( "name", this.childList["end"].name );
			root.appendChild( endNode );
		},
		
		parseXml : function(element) {
			for (var i = 0; i < element.childNodes.length; i++) {
				var child = element.childNodes[i];
				if(child.nodeName == "Activity") {
					var childModel = new CFActivity();
					childModel.init();
					childModel.parseXml(child);
					this.childList[childModel.id] = childModel;
	         	}
			}
		}
	};
	BDONodes = $.inherit(CFBase, overrideActs);
})(jQuery);