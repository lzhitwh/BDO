(function($){
	var overrideWorkflow = {
		processes : null,
		init: function(){
			this.processes = new BFProcesses();
			this.processes.init();
		},
		// 生成xml文件
		generateXml : function() {
			return this.processes.generateXml();
		},
		
		parseXml : function(element) {
			var rootElement = element.getElementsByTagName("workflow-app")[0];
			
			for (var i = 0; i < rootElement.childNodes.length; i++) {
				var child = rootElement.childNodes[i];
				if(child.nodeName === "action") {
					this.processes.parseXml(child);
	         	}
			}
		}
	};
	CFWorkflowApp = $.inherit(CFBase, overrideWorkflow);
})(jQuery);